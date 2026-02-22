Napisz pełną webową aplikację **Next.js 16.1.6 (App Router)** + **TailwindCSS** + **Supabase**, gotową do deployu na **Vercel**.  
To MVP **IT Interview Questions** z możliwością dodawania pytań przez użytkowników i śledzenia statystyk “I got this question”. Nie dodawaj komentarzy w kodzie. użyj skills do najlepszych praktyk tak by projekt był skalowalny.

---

## TECH STACK

- Next.js 16.1.6 (App Router)
- TailwindCSS z dark mode
- Supabase (technologies, questions, interview_reports)
- SEO-friendly, mobile-first, clean developer look
- Placeholdery Google AdSense
- Event tracking: question_view, technology_open, question_added, interview_marked
- Deployable na Vercel
- Bez logowania na start

---

## STRUKTURA FOLDERÓW (Claude ma to odwzorować dokładnie)

it-interview-questions/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ about/page.tsx
│  ├─ recent/page.tsx
│  ├─ add-question/page.tsx
│  ├─ technology/[slug]/page.tsx
│  └─ question/[slug]/page.tsx
├─ components/
│  ├─ Navbar.tsx
│  ├─ Footer.tsx
│  ├─ QuestionCard.tsx
│  ├─ TechnologyCard.tsx
│  ├─ AddQuestionForm.tsx
│  └─ Button.tsx
├─ lib/
│  ├─ supabaseClient.ts
│  ├─ seo.ts
│  └─ analytics.ts
├─ supabase/seed.ts  # script generujący seed questions (~250 pytań)
├─ public/favicon.ico
├─ styles/globals.css
├─ tailwind.config.js
├─ postcss.config.js
├─ next.config.js
├─ package.json
└─ .env.local (Supabase URL + anon key)

---

## DATABASE SCHEMA (Supabase)

**technologies**
- id (uuid)
- name (string)
- slug (string)

**questions**
- id (uuid)
- technology_id (uuid)
- question_text (string)
- answer_text (string)
- slug (string)
- difficulty (easy/medium/hard)
- interview_count (integer, default 0)
- status (pending/approved)
- created_at (timestamp)

**interview_reports**
- id (uuid)
- question_id (uuid)
- company (string, optional)
- country (string, optional)
- level (junior/mid/senior)
- created_at (timestamp)

---

## STRONY / FUNKCJE

1. **Home `/`**
    - Lista technologii
    - Top 5 najczęściej zadawanych pytań
    - CTA “Add Question”
    - Recent questions feed

2. **Technology `/technology/[slug]`**
    - Ranking pytań wg difficulty / most asked / newest
    - Lista pytań z linkiem do `/question/[slug]`

3. **Question `/question/[slug]`**
    - Pytanie + odpowiedź + difficulty
    - Licznik “Seen in X interviews”
    - Button “I got this question” → zapis w `interview_reports` + zwiększenie `interview_count`
    - Related questions feed

4. **Add Question `/add-question`**
    - Formularz:
        - Technology
        - Question
        - Short answer
        - Difficulty (easy/medium/hard)
        - Company (optional)
        - Country (optional)
        - Level (junior/mid/senior)
    - Po wysłaniu status = pending

5. **Recent `/recent`**
    - Feed ostatnio dodanych pytań

6. **About `/about`**
    - Krótka info o projekcie

---

## SEO / PERFORMANCE

- Każde pytanie = unikalny URL `/question/[slug]`
- Dynamic metadata (title, description, canonical)
- Sitemap.xml, robots.txt
- Structured Data JSON-LD dla Google
- Edge caching / CDN (Vercel)
- Minimal serverless functions, statyczne SEO pages (dla darmowego tieru)

---

## MONETYZACJA

- Google AdSense placeholder: co 3 pytania, sidebar desktop, sticky footer mobile

---

## ANALYTICS

Eventy:
- question_view
- technology_open
- question_added
- interview_marked

---

## SEED DATA

- ~250 startowych pytań:  
  React 60, JavaScript 60, Python 50, Java 40, System Design 40
- AI generuje pytania + krótkie odpowiedzi w stylu real interview

---

## UI / UX

- Dark mode, mobile-first, clean developer look
- Button “I got this question” działa natychmiast
- Responsywne karty pytań / technologii

---

## CLAUDE MA WYGNEROWAĆ

1. Struktura folderów + pliki Next.js 16.1.6 App Router
2. TailwindCSS + dark mode
3. Komponenty dla każdej strony
4. Supabase integration (CRUD + counts)
5. SEO + metadata
6. Seed data generator (~250 pytań)
7. Placeholdery AdSense
8. Event tracking hooks
9. Deployment-ready na Vercel

Wyeksportuj cały projekt w taki sposób, że po wgraniu na GitHub → Vercel build działa od razu.