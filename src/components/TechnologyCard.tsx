import Link from "next/link";
import type { Technology } from "@/lib/supabaseClient";
import { techIconMap } from "@/lib/techIcons";
import { dict } from "@/lib/i18n";

export default function TechnologyCard({
  tech,
}: {
  tech: Technology;
}) {
  const Icon = techIconMap[tech.slug];
  const label = dict.pl.technologyCard(tech.question_count);

  return (
    <Link
      href={`/technology/${tech.slug}`}
      className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-card-hover"
    >
      {Icon ? (
        <Icon className="h-10 w-10 text-foreground/80 group-hover:text-primary" />
      ) : (
        <span className="text-4xl">{tech.icon}</span>
      )}
      <h3 className="text-sm font-semibold text-foreground">{tech.name}</h3>
      <span className="text-xs text-muted">{label}</span>
    </Link>
  );
}
