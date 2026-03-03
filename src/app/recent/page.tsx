import { supabase } from "@/lib/supabaseClient";
import { createMetadata } from "@/lib/seo";
import { dict } from "@/lib/i18n";
import QuestionCard from "@/components/QuestionCard";
import Pagination from "@/components/Pagination";

export const revalidate = 3600;

export const metadata = createMetadata({
  title: "Ostatnio dodane pytania",
  description:
    "Przeglądaj najnowsze pytania rekrutacyjne dodane przez społeczność.",
  path: "/recent",
});

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function RecentPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const t = dict.pl;

  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10));
  const perPage = 20;
  const from = (currentPage - 1) * perPage;
  const to = from + perPage - 1;

  const { data: questions, count } = await supabase
    .from("questions")
    .select("*", { count: "exact" })
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .range(from, to);

  const totalPages = Math.ceil((count ?? 0) / perPage);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold sm:text-3xl">{t.recent.title}</h1>
      <p className="mb-8 text-muted">{t.recent.subtitle}</p>

      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-3">
          {(questions ?? []).map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
          {(!questions || questions.length === 0) && (
            <p className="py-10 text-center text-muted">{t.recent.empty}</p>
          )}
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          )}
        </div>

      </div>
    </div>
  );
}
