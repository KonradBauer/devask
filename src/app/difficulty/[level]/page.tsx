import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { createMetadata } from "@/lib/seo";
import { dict } from "@/lib/i18n";
import QuestionCard from "@/components/QuestionCard";
import AdComponent from "@/components/AdComponent";
import Pagination from "@/components/Pagination";

export const revalidate = 3600;

const validLevels = ["junior", "mid", "senior"];

type Props = {
  params: Promise<{ level: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { level } = await params;
  if (!validLevels.includes(level)) return {};
  const t = dict.pl;
  return createMetadata({
    title: `${t.difficulty.heading} — ${level.charAt(0).toUpperCase() + level.slice(1)}`,
    description: `Pytania rekrutacyjne na poziomie ${level}.`,
    path: `/difficulty/${level}`,
  });
}

export default async function DifficultyPage({ params, searchParams }: Props) {
  const { level } = await params;
  const { page: pageParam } = await searchParams;

  if (!validLevels.includes(level)) notFound();

  const t = dict.pl;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10));
  const perPage = 20;
  const from = (currentPage - 1) * perPage;
  const to = from + perPage - 1;

  const { data: questions, count } = await supabase
    .from("questions")
    .select("*", { count: "exact" })
    .eq("status", "approved")
    .eq("difficulty", level)
    .order("interview_count", { ascending: false })
    .range(from, to);

  const totalPages = Math.ceil((count ?? 0) / perPage);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold capitalize sm:text-3xl">
        {t.difficulty.heading} — {level}
      </h1>
      <p className="mb-8 text-muted">
        {t.difficulty.count(count ?? 0)}
      </p>

      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-3">
          {(questions ?? []).map((q, i) => (
            <div key={q.id}>
              <QuestionCard question={q} />
              {(i + 1) % 5 === 0 && <AdComponent size="inline" className="mt-3" />}
            </div>
          ))}
          {(!questions || questions.length === 0) && (
            <p className="py-10 text-center text-muted">Brak pytań.</p>
          )}
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          )}
        </div>

        <AdComponent size="sidebar" />
      </div>

      <AdComponent size="sticky" />
    </div>
  );
}
