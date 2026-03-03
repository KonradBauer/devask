import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export const revalidate = 3600;
import { dict } from "@/lib/i18n";
import TechnologyCard from "@/components/TechnologyCard";
import QuestionCard from "@/components/QuestionCard";

function pickQuestionOfDay(questions: Array<{ id: string; slug: string; title: string; technology_name: string; difficulty: string; interview_count: number }>) {
  if (questions.length === 0) return null;
  const d = new Date();
  const idx = (d.getFullYear() * 366 + d.getMonth() * 31 + d.getDate()) % questions.length;
  return questions[idx];
}

export default async function HomePage() {
  const t = dict.pl;

  const [techResult, topResult, recentResult, allApprovedResult] = await Promise.all([
    supabase.from("technologies").select("*").order("name"),
    supabase
      .from("questions")
      .select("*")
      .eq("status", "approved")
      .order("interview_count", { ascending: false })
      .limit(5),
    supabase
      .from("questions")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("questions")
      .select("id, slug, title, technology_name, difficulty, interview_count, technology_slug, technology_id, answer, status, level, created_at")
      .eq("status", "approved"),
  ]);

  const technologies = techResult.data ?? [];
  const topQuestions = topResult.data ?? [];
  const recentQuestions = recentResult.data ?? [];
  const allApproved = allApprovedResult.data ?? [];
  const questionOfDay = pickQuestionOfDay(allApproved);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="mb-12 text-center">
        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
          {t.home.headline}
        </h1>
        <p className="mx-auto max-w-xl text-muted">{t.home.subtitle}</p>
      </section>

      <section className="mb-12">
        <h2 className="mb-5 text-xl font-semibold">{t.home.technologies}</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {technologies.map((tech) => (
            <TechnologyCard key={tech.id} tech={tech} />
          ))}
        </div>
      </section>

      {questionOfDay && (
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">{t.home.questionOfDay}</h2>
          <Link
            href={`/question/${questionOfDay.slug}`}
            className="block rounded-xl border-2 border-primary/30 bg-primary/5 p-6 transition-colors hover:border-primary/60 hover:bg-primary/10"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium capitalize text-primary">
                {questionOfDay.difficulty}
              </span>
              <span className="text-xs text-muted">{questionOfDay.technology_name}</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground">{questionOfDay.title}</h3>
          </Link>
        </section>
      )}

      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="space-y-10">
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">{t.home.mostAsked}</h2>
            </div>
            <div className="flex flex-col gap-3">
              {topQuestions.map((q) => (
                <QuestionCard key={q.id} question={q} />
              ))}
            </div>
          </section>

          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">{t.home.recentlyAdded}</h2>
              <Link
                href="/recent"
                className="text-sm text-primary hover:text-primary-hover"
              >
                {t.home.viewAll}
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {recentQuestions.map((q) => (
                <QuestionCard key={q.id} question={q} />
              ))}
            </div>
          </section>
        </div>

        <aside className="hidden lg:block" />
      </div>

    </div>
  );
}
