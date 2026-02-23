"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import type { SortLabels } from "@/lib/i18n";

export default function SortControls({
  current,
  labels,
}: {
  current: string;
  labels: SortLabels;
}) {
  const pathname = usePathname();

  const options = [
    { value: "most-asked", label: labels.mostAsked },
    { value: "newest", label: labels.newest },
    { value: "difficulty", label: labels.difficulty },
  ];

  return (
    <div className="mb-6 flex gap-2">
      {options.map((opt) => (
        <Link
          key={opt.value}
          href={`${pathname}?sort=${opt.value}`}
          className={clsx(
            "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
            current === opt.value
              ? "bg-primary text-white"
              : "bg-card text-muted hover:text-foreground hover:bg-card-hover"
          )}
        >
          {opt.label}
        </Link>
      ))}
    </div>
  );
}
