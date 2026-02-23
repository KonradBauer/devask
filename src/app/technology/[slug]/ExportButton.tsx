"use client";

import type { Question } from "@/lib/supabaseClient";
import { dict } from "@/lib/i18n";

export default function ExportButton({
  techName,
  questions,
}: {
  techName: string;
  questions: Question[];
}) {
  const t = dict.pl;

  function exportMd() {
    const lines = [`# ${techName} — Pytania rekrutacyjne\n`];
    questions.forEach((q, i) => {
      lines.push(`## ${i + 1}. ${q.title}`);
      lines.push(`**Trudność:** ${q.difficulty}\n`);
      lines.push(q.answer);
      lines.push("");
    });
    const blob = new Blob([lines.join("\n")], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${techName.toLowerCase().replace(/\s+/g, "-")}-questions.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportPdf() {
    window.print();
  }

  return (
    <div className="flex items-center gap-2 mb-4">
      <button
        onClick={exportMd}
        className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:bg-card-hover hover:text-foreground"
      >
        {t.technology.exportMd}
      </button>
      <button
        onClick={exportPdf}
        className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:bg-card-hover hover:text-foreground"
      >
        {t.technology.exportPdf}
      </button>
    </div>
  );
}
