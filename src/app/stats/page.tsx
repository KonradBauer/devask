import { supabase } from "@/lib/supabaseClient";
import { createMetadata } from "@/lib/seo";
import { dict } from "@/lib/i18n";

export const revalidate = 3600;

export const metadata = createMetadata({
  title: "Statystyki",
  description: "Statystyki pytań rekrutacyjnych IT — podział wg trudności i technologii.",
  path: "/stats",
});

export default async function StatsPage() {
  const t = dict.pl;

  const [questionsResult, techResult] = await Promise.all([
    supabase.from("questions").select("difficulty").eq("status", "approved"),
    supabase.from("technologies").select("name, question_count").order("question_count", { ascending: false }).limit(15),
  ]);

  const questions = questionsResult.data ?? [];
  const technologies = techResult.data ?? [];

  const total = questions.length;
  const byDifficulty = {
    junior: questions.filter((q) => q.difficulty === "junior").length,
    mid: questions.filter((q) => q.difficulty === "mid").length,
    senior: questions.filter((q) => q.difficulty === "senior").length,
  };

  const maxTechCount = technologies[0]?.question_count ?? 1;

  const diffColors: Record<string, string> = {
    junior: "bg-junior",
    mid: "bg-mid",
    senior: "bg-senior",
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold sm:text-3xl">{t.stats.title}</h1>
      <p className="mb-10 text-muted">
        {total} {t.stats.questions}
      </p>

      <section className="mb-12">
        <h2 className="mb-6 text-lg font-semibold">{t.stats.byDifficulty}</h2>
        <div className="flex flex-col gap-4">
          {(["junior", "mid", "senior"] as const).map((level) => {
            const count = byDifficulty[level];
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div key={level}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium capitalize">{level}</span>
                  <span className="text-muted">{count} ({pct}%)</span>
                </div>
                <div className="h-4 w-full rounded-full bg-card">
                  <div
                    className={`h-4 rounded-full ${diffColors[level]}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-lg font-semibold">{t.stats.byTechnology}</h2>
        <div className="flex flex-col gap-3">
          {technologies.map((tech) => {
            const pct = maxTechCount > 0 ? Math.round((tech.question_count / maxTechCount) * 100) : 0;
            return (
              <div key={tech.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">{tech.name}</span>
                  <span className="text-muted">{tech.question_count}</span>
                </div>
                <div className="h-3 w-full rounded-full bg-card">
                  <div
                    className="h-3 rounded-full bg-primary"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
