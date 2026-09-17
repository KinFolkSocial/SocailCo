"use client";

import { useActionState, useState } from "react";
import { useMounted } from "@/hooks/useMounted";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InquirySchema,
  budgetRangeOptions,
  eventTypeOptions,
  guestCountOptions,
  inquirySteps,
  type InquiryValues,
} from "@/lib/inquiry";
import { submitInquiry, type InquiryActionState } from "@/app/contact/actions";
import { TextField, TextAreaField } from "@/components/ui/Field";
import { PillRadioGroup } from "@/components/forms/PillRadioGroup";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const initialState: InquiryActionState = { status: "idle" };

/**
 * A single always-complete <form> (every field always in the DOM) that
 * degrades to one long plain form without JS. Once hydrated, `mounted`
 * flips true and CSS-hides every step but the current one, turning it into
 * a one-question-at-a-time wizard — nothing is ever conditionally
 * unmounted, so a no-JS submission still posts every field via the real
 * <form action> (a Server Action, which Next progressively enhances).
 */
export function InquiryForm() {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);
  const mounted = useMounted();
  const [step, setStep] = useState(0);

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<InquiryValues>({
    resolver: zodResolver(InquirySchema),
    mode: "onBlur",
  });

  const isLastStep = step === inquirySteps.length - 1;

  // Server-side errors only matter when the client never ran (no-JS full
  // reload) — otherwise per-step `trigger()` already caught it client-side.
  const fieldError = (name: keyof InquiryValues): string | undefined =>
    errors[name]?.message ?? (state.status === "error" ? state.fieldErrors?.[name]?.[0] : undefined);

  const goNext = async () => {
    const valid = await trigger(inquirySteps[step].fields);
    if (valid) setStep((s) => Math.min(s + 1, inquirySteps.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  if (state.status === "success") {
    return (
      <div role="status" className="max-w-[52ch]">
        <h2 className="font-display text-display-2 uppercase">Got it.</h2>
        <p className="mt-4 font-body text-body-lg text-smoke">
          Thanks for reaching out — we usually reply within one business day. Keep an eye on your
          inbox.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col">
      <div className="mb-10">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-smoke">
          {mounted ? `Step ${step + 1} of ${inquirySteps.length}` : `${inquirySteps.length} questions`}
        </p>
        <div className="mt-3 h-px w-full bg-smoke/20">
          <div
            className="h-full bg-amber transition-all duration-700 ease-[var(--ease-kinfolk)]"
            style={{ width: mounted ? `${((step + 1) / inquirySteps.length) * 100}%` : "100%" }}
          />
        </div>
      </div>

      {state.status === "error" && (
        <p role="alert" className="mb-8 font-body text-sm text-clay">
          {state.message}
        </p>
      )}

      {/* Honeypot — hidden from sighted and AT users, never focusable. */}
      <div aria-hidden="true" className="h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="inquiry-company">Company</label>
        <input id="inquiry-company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="flex flex-col gap-12">
        <div className={cn(mounted && step !== 0 && "hidden")}>
          <PillRadioGroup
            legend={inquirySteps[0].title}
            name="eventType"
            options={eventTypeOptions}
            register={register}
            error={fieldError("eventType")}
          />
        </div>

        <div className={cn(mounted && step !== 1 && "hidden")}>
          <TextField
            label={inquirySteps[1].title}
            placeholder="e.g. June 14, 2026, or TBD"
            error={fieldError("eventDate")}
            {...register("eventDate")}
          />
        </div>

        <div className={cn(mounted && step !== 2 && "hidden")}>
          <TextField
            label={inquirySteps[2].title}
            placeholder="City, venue, or region"
            error={fieldError("location")}
            {...register("location")}
          />
        </div>

        <div className={cn(mounted && step !== 3 && "hidden")}>
          <PillRadioGroup
            legend={inquirySteps[3].title}
            name="guestCount"
            options={guestCountOptions}
            register={register}
            error={fieldError("guestCount")}
          />
        </div>

        <div className={cn(mounted && step !== 4 && "hidden")}>
          <PillRadioGroup
            legend={inquirySteps[4].title}
            name="budgetRange"
            options={budgetRangeOptions}
            register={register}
            error={fieldError("budgetRange")}
          />
        </div>

        <div className={cn(mounted && step !== 5 && "hidden")}>
          <fieldset className="flex flex-col gap-6">
            <legend className="font-display text-display-3 uppercase">{inquirySteps[5].title}</legend>
            <TextField label="Full name" error={fieldError("name")} {...register("name")} />
            <TextField label="Email" type="email" error={fieldError("email")} {...register("email")} />
            <TextField label="Phone" type="tel" error={fieldError("phone")} {...register("phone")} />
          </fieldset>
        </div>

        <div className={cn(mounted && step !== 6 && "hidden")}>
          <TextAreaField
            label={inquirySteps[6].title}
            placeholder="A few sentences on the vision..."
            error={fieldError("details")}
            {...register("details")}
          />
        </div>
      </div>

      <div className="mt-12 flex items-center gap-4">
        {mounted && step > 0 && (
          <Button type="button" variant="secondary" onClick={goBack}>
            Back
          </Button>
        )}
        {mounted && !isLastStep && (
          <Button type="button" onClick={goNext}>
            Next
          </Button>
        )}
        {(!mounted || isLastStep) && (
          <Button type="submit" disabled={isPending}>
            {isPending ? "Sending..." : "Send inquiry"}
          </Button>
        )}
      </div>
    </form>
  );
}
