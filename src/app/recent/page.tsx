import { supabase } from "@/lib/supabaseClient";
import { createMetadata } from "@/lib/seo";
import { dict } from "@/lib/i18n";
import QuestionCard from "@/components/QuestionCard";
import AdComponent from "@/components/AdComponent";

export const metadata = createMetadata({
  title: "Ostatnio dodane pytania",
  description:
    "Przeglądaj najnowsze pytania rekrutacyjne dodane przez społeczność.",
  path: "/recent",
});

export default async function RecentPage() {
  const t = dict.pl;

  const { data: questions } = await supabase
    .from("questions")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold sm:text-3xl">{t.recent.title}</h1>
      <p className="mb-8 text-muted">{t.recent.subtitle}</p>

      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-3">
          {(questions ?? []).map((q, i) => (
            <div key={q.id}>
              <QuestionCard question={q} />
              {(i + 1) % 5 === 0 && <AdComponent size="inline" className="mt-3" />}
            </div>
          ))}
          {(!questions || questions.length === 0) && (
            <p className="py-10 text-center text-muted">{t.recent.empty}</p>
          )}
        </div>

        <AdComponent size="sidebar" />
      </div>

      <AdComponent size="sticky" />
    </div>
  );
}
