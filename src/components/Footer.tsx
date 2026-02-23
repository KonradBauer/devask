import Link from "next/link";
import { dict } from "@/lib/i18n";

export default function Footer() {
  const t = dict.pl.footer;
  const nav = dict.pl.nav;

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center text-sm text-muted md:flex-row md:justify-between md:text-left">
        <p>{t.copy(new Date().getFullYear())}</p>
        <div className="flex gap-6">
          <Link href="/about" className="transition-colors hover:text-foreground">
            {t.about}
          </Link>
          <Link href="/recent" className="transition-colors hover:text-foreground">
            {t.recent}
          </Link>
          <Link href="/stats" className="transition-colors hover:text-foreground">
            {nav.stats}
          </Link>
          <Link href="/add-question" className="transition-colors hover:text-foreground">
            {t.addQuestion}
          </Link>
        </div>
      </div>
    </footer>
  );
}
