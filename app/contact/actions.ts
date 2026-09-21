"use server";

import { headers } from "next/headers";
import { InquirySchema } from "@/lib/inquiry";
import { supabase } from "@/lib/supabase";
import { sendInquiryEmailNotification } from "@/lib/email";

export type InquiryActionState =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> }
  | { status: "success" };

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

/**
 * In-memory rate limiting.
 */
const submissionLog = new Map<string, number[]>();

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const recent = (submissionLog.get(key) ?? []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    submissionLog.set(key, recent);
    return false;
  }

  recent.push(now);
  submissionLog.set(key, recent);
  return true;
}

export async function submitInquiry(
  _prevState: InquiryActionState,
  formData: FormData,
): Promise<InquiryActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = InquirySchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Check the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  if (parsed.data.company) {
    // Honeypot tripped — pretend success, drop silently rather than tipping the bot off.
    return { status: "success" };
  }

  const headerList = await headers();
  const rateLimitKey = headerList.get("x-forwarded-for") ?? headerList.get("x-real-ip") ?? "anonymous";

  if (!checkRateLimit(rateLimitKey)) {
    return { status: "error", message: "Too many submissions — please try again in a minute." };
  }

  const { error } = await supabase.from("inquiries").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    event_type: parsed.data.eventType,
    event_date: parsed.data.eventDate,
    location: parsed.data.location,
    guest_count: parsed.data.guestCount,
    budget_range: parsed.data.budgetRange,
    details: parsed.data.details,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return {
      status: "error",
      message: "Failed to save inquiry to database. Please try again later.",
    };
  }

  // Trigger Hostinger SMTP email dispatch asynchronously so form submission completes smoothly
  sendInquiryEmailNotification(parsed.data).catch((err) => {
    console.error("Background email dispatch error:", err);
  });

  return { status: "success" };
}


