"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { trackEvent } from "@/lib/analytics";
import Button from "@/components/Button";
import type { QuestionStrings } from "@/lib/i18n";

export default function ReportButton({
  questionId,
  strings,
}: {
  questionId: string;
  strings: QuestionStrings;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    company: "",
    level: "",
    country: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await Promise.all([
      supabase.from("interview_reports").insert({
        question_id: questionId,
        company: form.company || "Unknown",
        level: form.level || "Unknown",
        country: form.country || "Unknown",
      }),
      supabase.rpc("increment_interview_count", { q_id: questionId }),
    ]);

    trackEvent("interview_marked", { question_id: questionId });
    setLoading(false);
    setDone(true);
    setOpen(false);
  }

  if (done) {
    return (
      <div className="rounded-lg bg-success/10 px-4 py-3 text-sm text-success">
        {strings.thanks}
      </div>
    );
  }

  if (!open) {
    return (
      <Button variant="secondary" onClick={() => setOpen(true)}>
        {strings.gotThis}
      </Button>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:border-primary focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card p-5"
    >
      <h3 className="mb-4 text-sm font-semibold">{strings.reportTitle}</h3>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder={strings.company}
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className={inputClass}
        />
        <input
          type="text"
          placeholder={strings.level}
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
          className={inputClass}
        />
        <input
          type="text"
          placeholder={strings.country}
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          className={inputClass}
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? strings.submitting : strings.submit}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setOpen(false)}
          >
            {strings.cancel}
          </Button>
        </div>
      </div>
    </form>
  );
}
