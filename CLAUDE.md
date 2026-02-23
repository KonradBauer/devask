# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**IT Interview Questions** — an MVP web app where users can browse interview questions by technology, report "I got this question" with company/level metadata, and submit new questions. No authentication required. Designed for Vercel deployment on the free tier.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — ESLint (Next.js core-web-vitals + TypeScript rules)
- `npx ts-node supabase/seed.ts` — seed the database with ~250 questions

## Tech Stack

- **Next.js 16.1.6** with App Router, React Compiler enabled
- **TailwindCSS v4** (via `@tailwindcss/postcss` plugin, no `tailwind.config.js` — uses CSS-based config in `globals.css`)
- **Supabase** for database (client-side via `@supabase/supabase-js`)
- **TypeScript** with strict mode, path alias `@/*` → `./src/*`

## Architecture

### Routing (App Router)

All pages live under `src/app/` using file-based routing:
- `/` — homepage: technology grid, top-5 most-asked questions, recent feed
- `/technology/[slug]` — questions for a technology, sortable by difficulty/most-asked/newest
- `/question/[slug]` — single question detail with "I got this question" reporting
- `/add-question` — submission form (saves with `status: pending`)
- `/recent` — recently added questions feed
- `/about` — project info

### Database (Supabase)

Three tables: `technologies`, `questions`, `interview_reports`. The `questions.interview_count` integer is incremented when users click "I got this question", which also inserts into `interview_reports`.

### Key Conventions

- **No code comments** — the codebase intentionally has zero comments
- **No auth** — all features are public, no login/session management
- **Dark mode** with TailwindCSS, mobile-first responsive design
- **SEO**: each page has dynamic `generateMetadata`, JSON-LD structured data, sitemap.xml, robots.txt
- **AdSense placeholders**: every 3rd question card, desktop sidebar, mobile sticky footer
- **Analytics**: lightweight event tracking via `lib/analytics.ts` for events: `question_view`, `technology_open`, `question_added`, `interview_marked`

### Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

# CLAUDE.md — Ultra Token-Efficient Mode (Extreme)

## 1. Core Philosophy

* Claude działa wyłącznie jako **współprogramista** na poziomie seniora, nie agent.
* Maksymalizuj **output / token**.
* Każda odpowiedź jest **najkrótsza możliwa**, w pełni funkcjonalna, bez wyjaśnień czy powtórzeń.

---

## 2. Extreme Output Discipline

* **Maks 100–150 linii / odpowiedź**.
* Generuj tylko **to, co jest bezpośrednio potrzebne**.
* Żadnych wyjaśnień, powtórzeń, komentarzy narracyjnych.
* Duże pliki → **automatyczne dzielenie na części**.

---

## 3. Chunked File Protocol

1. Utwórz **skeleton pliku** z komentarzami sekcji.
2. Wypełniaj sekcje **po jednej**, każda <150 linii.
3. Zatrzymaj się po każdej sekcji → czekaj na instrukcję „continue/append”.
4. Nigdy nie generuj całego dużego pliku naraz.

---

## 4. Minimal Planning

* Twórz **krótki plan max 5–10 punktów** przed implementacją.
* Nie implementuj automatycznie.
* Czekaj na potwierdzenie użytkownika.

---

## 5. Context & Snapshot Management

* Minimalizuj historię kontekstu: referencje zamiast kopiowania.
* Twórz **snapshot postępu** w punktach: zakończone moduły + bieżące zadanie.
* Kontynuuj tylko od snapshot → zużycie tokenów minimalne.

---

## 6. Token Safety

* Zawsze **oszacuj rozmiar output** przed generowaniem.
* Jeśli przekroczy limit:

    * podziel odpowiedź
    * zatrzymaj się
    * poproś użytkownika o kontynuację
* Nigdy nie ryzykuj długiego outputu.

---

## 7. Interaction Protocol

* Po każdej części STOP.
* Kończ komunikat jednym z:

    * READY FOR NEXT STEP
    * SECTION COMPLETE
    * WAITING FOR INSTRUCTION
* Nie kontynuuj automatycznie.

---

## 8. Tool / CLI Usage

* Preferuj:

    * append małych sekcji
    * iteracyjne uzupełnianie danych
* Unikaj:

    * Task() / agenci
    * pełnej regeneracji dużych plików
    * repo-wide operacji bez instrukcji

---

## 9. Intelligence Allocation

* Default → szybkie praktyczne rozwiązanie.
* Only escalate complexity on explicit request (optimization, redesign, reasoning).
* Unikaj spekulacji, alternatyw, lub długich analiz.

---

## 10. Auto-Chunking Protocol

* Jeśli zadanie → duży plik:

    1. Podziel na sekcje <150 linii.
    2. Wygeneruj część 1 → STOP
    3. Wygeneruj część 2 po poleceniu „continue”
    4. Repeat aż do końca
* Zapewnia **ciągłość pracy** bez blokad limitu.

---

## 11. Operational Goal

* Sustained development sessions
* Minimal token usage
* Maximum output per step
* Never hit usage limits
