"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { clsx } from "clsx";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    }
  }

  const withGaps: (number | "...")[] = [];
  for (let i = 0; i < pages.length; i++) {
    if (i > 0 && pages[i] - pages[i - 1] > 1) {
      withGaps.push("...");
    }
    withGaps.push(pages[i]);
  }

  return (
    <nav className="mt-6 flex items-center justify-center gap-1" aria-label="Pagination">
      {currentPage > 1 && (
        <Link
          href={buildHref(currentPage - 1)}
          className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted hover:bg-card-hover hover:text-foreground"
        >
          &larr;
        </Link>
      )}
      {withGaps.map((item, i) =>
        item === "..." ? (
          <span key={`gap-${i}`} className="px-2 text-sm text-muted">...</span>
        ) : (
          <Link
            key={item}
            href={buildHref(item)}
            className={clsx(
              "rounded-lg px-3 py-1.5 text-sm transition-colors",
              item === currentPage
                ? "bg-primary text-white"
                : "border border-border text-muted hover:bg-card-hover hover:text-foreground"
            )}
          >
            {item}
          </Link>
        )
      )}
      {currentPage < totalPages && (
        <Link
          href={buildHref(currentPage + 1)}
          className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted hover:bg-card-hover hover:text-foreground"
        >
          &rarr;
        </Link>
      )}
    </nav>
  );
}
