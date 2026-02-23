"use client";

import { useState, useEffect } from "react";
import { supabase, type Technology } from "@/lib/supabaseClient";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/lib/ToastContext";
import Button from "./Button";
import type { AddQuestionStrings } from "@/lib/i18n";

export default function AddQuestionForm({
  strings,
}: {
  strings: AddQuestionStrings;
}) {
  const { showToast } = useToast();
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    technology_id: "",
    title: "",
    answer: "",
    difficulty: "mid" as "junior" | "mid" | "senior",
  });

  useEffect(() => {
    supabase
      .from("technologies")
      .select("*")
      .order("name")
      .then(({ data }) => {
        if (data) setTechnologies(data);
      });
  }, []);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const lastSubmit = localStorage.getItem("lastQuestionSubmit");
    if (lastSubmit && Date.now() - parseInt(lastSubmit, 10) < 600000) {
      showToast(strings.rateLimited ?? "Odczekaj 10 minut przed dodaniem kolejnego pytania.", "error");
      setLoading(false);
      return;
    }

    const tech = technologies.find((t) => t.id === form.technology_id);
    const slug =
      form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") +
      "-" +
      Date.now().toString(36);

    const { error: insertError } = await supabase.from("questions").insert({
      technology_id: form.technology_id,
      technology_slug: tech?.slug ?? "",
      technology_name: tech?.name ?? "",
      title: form.title,
      slug,
      answer: form.answer,
      difficulty: form.difficulty,
      interview_count: 0,
      status: "pending",
    });

    setLoading(false);

    if (insertError) {
      showToast(insertError.message, "error");
      return;
    }

    trackEvent("question_added", { technology: tech?.name ?? "" });
    localStorage.setItem("lastQuestionSubmit", String(Date.now()));
    showToast(strings.success);
    setForm({
      technology_id: "",
      title: "",
      answer: "",
      difficulty: "mid",
    });
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:border-primary focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">
        {strings.hint}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          {strings.technology}
        </label>
        <select
          required
          value={form.technology_id}
          onChange={(e) => update("technology_id", e.target.value)}
          className={inputClass}
        >
          <option value="">{strings.selectTechnology}</option>
          {technologies.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          {strings.question}
        </label>
        <textarea
          required
          rows={3}
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder={strings.questionPlaceholder}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          {strings.answer}
        </label>
        <textarea
          required
          rows={6}
          value={form.answer}
          onChange={(e) => update("answer", e.target.value)}
          placeholder={strings.answerPlaceholder}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">
          {strings.difficulty}
        </label>
        <select
          required
          value={form.difficulty}
          onChange={(e) => update("difficulty", e.target.value)}
          className={inputClass}
        >
          <option value="junior">{strings.junior}</option>
          <option value="mid">{strings.mid}</option>
          <option value="senior">{strings.senior}</option>
        </select>
      </div>

      <Button type="submit" disabled={loading} className="self-start">
        {loading ? strings.submitting : strings.submit}
      </Button>
    </form>
  );
}
