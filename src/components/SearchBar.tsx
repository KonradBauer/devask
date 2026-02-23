"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineSearch, HiOutlineX } from "react-icons/hi";
import { supabase } from "@/lib/supabaseClient";
import { useDebounce } from "@/lib/useDebounce";
import type { SearchStrings } from "@/lib/i18n";

type SearchResult = {
  id: string;
  slug: string;
  title: string;
  technology_name: string;
  difficulty: string;
};

export default function SearchBar({
  strings,
}: {
  strings: SearchStrings;
  lang?: string;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [fetchedQuery, setFetchedQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  const loading = debouncedQuery.trim().length > 0 && debouncedQuery !== fetchedQuery;

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      return;
    }

    let cancelled = false;
    supabase
      .from("questions")
      .select("id, slug, title, technology_name, difficulty")
      .eq("status", "approved")
      .textSearch("search_vector", debouncedQuery, { type: "plain", config: "simple" })
      .limit(8)
      .then(({ data }) => {
        if (cancelled) return;
        setResults(data ?? []);
        setFetchedQuery(debouncedQuery);
        setActiveIndex(-1);
      });
    return () => { cancelled = true; };
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const result = results[activeIndex];
      if (result) navigate(result.slug);
    }
  }

  function navigate(slug: string) {
    setOpen(false);
    setQuery("");
    router.push(`/question/${slug}`);
  }

  const showDropdown = open && query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <HiOutlineSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={strings.placeholder}
          className="h-9 w-full rounded-lg border border-border bg-card pl-9 pr-8 text-sm text-foreground placeholder:text-muted/60 focus:border-primary focus:outline-none md:w-72"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              inputRef.current?.focus();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
          >
            <HiOutlineX className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-full min-w-[320px] rounded-xl border border-border bg-card shadow-xl md:w-96">
          {loading ? (
            <div className="flex flex-col gap-2 p-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-12 animate-pulse rounded-lg bg-card-hover"
                />
              ))}
            </div>
          ) : results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted">Brak wyników.</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1">
              {results.map((r, i) => {
                const title = r.title;
                return (
                  <li key={r.id}>
                    <button
                      onClick={() => navigate(r.slug)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex w-full flex-col gap-0.5 px-4 py-2.5 text-left transition-colors ${
                        activeIndex === i
                          ? "bg-card-hover"
                          : "hover:bg-card-hover"
                      }`}
                    >
                      <span className="line-clamp-1 text-sm font-medium text-foreground">
                        {title}
                      </span>
                      <span className="text-xs text-muted">
                        {r.technology_name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
