"use client";

import { useState } from "react";
import { dict } from "@/lib/i18n";

export default function QuizAnswer({
  answer,
  label,
}: {
  answer: string;
  label: string;
}) {
  const [revealed, setRevealed] = useState(false);
  const t = dict.pl;

  return (
    <div className="mb-8 rounded-xl border border-border bg-card">
      <button
        onClick={() => setRevealed(!revealed)}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <h2 className="text-sm font-semibold text-muted uppercase tracking-wider">
          {label}
        </h2>
        <span className="text-sm text-primary">
          {revealed ? t.question.hideAnswer : t.question.showAnswer}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          revealed ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 prose prose-invert max-w-none text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
          {answer}
        </div>
      </div>
    </div>
  );
}
