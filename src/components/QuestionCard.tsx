import Link from "next/link";
import { clsx } from "clsx";
import type { Question } from "@/lib/supabaseClient";

const difficultyColors: Record<string, string> = {
  junior: "bg-junior/15 text-junior",
  mid: "bg-mid/15 text-mid",
  senior: "bg-senior/15 text-senior",
};

export default function QuestionCard({
  question,
}: {
  question: Question;
}) {
  const title = question.title;

  return (
    <Link
      href={`/question/${question.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-card-hover"
    >
      <div className="flex items-center gap-2">
        <span
          className={clsx(
            "rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
            difficultyColors[question.difficulty] ?? "bg-muted/15 text-muted"
          )}
        >
          {question.difficulty}
        </span>
        {question.technology_name && (
          <span className="text-xs text-muted">{question.technology_name}</span>
        )}
      </div>
      <h3 className="text-sm font-medium leading-snug text-foreground group-hover:text-primary-hover">
        {title}
      </h3>
      <div className="flex items-center gap-3 text-xs text-muted">
        <span>{question.interview_count} zgłoszeń</span>
        {question.company && <span>&middot; {question.company}</span>}
      </div>
    </Link>
  );
}
