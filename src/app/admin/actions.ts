"use server";

import { supabaseAdmin } from "@/lib/supabaseServer";

function isValidAdmin(secret: string): boolean {
  return secret === process.env.ADMIN_SECRET;
}

export async function verifyAdmin(secret: string) {
  return { ok: isValidAdmin(secret) };
}

export async function getPendingQuestions(secret: string) {
  if (!isValidAdmin(secret)) return { error: "unauthorized", data: null };

  const { data, error } = await supabaseAdmin
    .from("questions")
    .select("id, title, answer, technology_name, difficulty, level, created_at")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) return { error: error.message, data: null };
  return { error: null, data };
}

export async function approveQuestion(secret: string, id: string) {
  if (!isValidAdmin(secret)) return { error: "unauthorized" };

  const { error } = await supabaseAdmin
    .from("questions")
    .update({ status: "approved" })
    .eq("id", id);

  if (error) return { error: error.message };
  return { error: null };
}

export async function rejectQuestion(secret: string, id: string) {
  if (!isValidAdmin(secret)) return { error: "unauthorized" };

  const { error } = await supabaseAdmin
    .from("questions")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };
  return { error: null };
}
