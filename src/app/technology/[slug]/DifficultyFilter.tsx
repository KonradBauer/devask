"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { dict } from "@/lib/i18n";

const levels = ["junior", "mid", "senior"] as const;

export default function DifficultyFilter({ current }: { current: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = dict.pl;

  function toggle(level: string) {
    const next = current.includes(level)
      ? current.filter((d) => d !== level)
      : [...current, level];

    const params = new URLSearchParams(searchParams.toString());
    if (next.length === 0 || next.length === 3) {
      params.delete("difficulty");
    } else {
      params.set("difficulty", next.join(","));
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm text-muted">{t.filter.difficulty}:</span>
      {levels.map((level) => (
        <button
          key={level}
          onClick={() => toggle(level)}
          className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
            current.includes(level)
              ? `bg-${level}/20 text-${level} border border-${level}/50`
              : "bg-card text-muted border border-border hover:border-muted"
          }`}
        >
          {level}
        </button>
      ))}
    </div>
  );
}
