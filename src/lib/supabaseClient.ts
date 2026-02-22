import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseUrl = rawUrl.startsWith("https://")
  ? rawUrl
  : "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Technology = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  question_count: number;
  created_at: string;
};

export type Question = {
  id: string;
  technology_id: string;
  technology_slug: string;
  technology_name: string;
  title: string;
  slug: string;
  answer: string;
  difficulty: "junior" | "mid" | "senior";
  interview_count: number;
  status: "approved" | "pending";
  company: string | null;
  country: string | null;
  level: string | null;
  created_at: string;
};

export type InterviewReport = {
  id: string;
  question_id: string;
  company: string;
  level: string;
  country: string;
  created_at: string;
};
