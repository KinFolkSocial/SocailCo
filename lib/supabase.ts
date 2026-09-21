import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://joyubfcoznfagghtrobv.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpveXViZmNvem5mYWdnaHRyb2J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwMTA3MTQsImV4cCI6MjEwNTU4NjcxNH0.p9-6S2QHpUiqletK9Avv9lbpqIT8GilVGuSSxnVbhnw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
