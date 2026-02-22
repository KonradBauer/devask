"use client";

import { useState } from "react";
import { dict } from "@/lib/i18n";
import Button from "@/components/Button";
import {
  verifyAdmin,
  getPendingQuestions,
  approveQuestion,
  rejectQuestion,
} from "./actions";

type PendingQuestion = {
  id: string;
  title: string;
  answer: string;
  technology_name: string;
  difficulty: string;
  level: string | null;
  created_at: string;
};

export default function AdminPage() {
  const t = dict.pl.admin;
  const [secret, setSecret] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [questions, setQuestions] = useState<PendingQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionMsg, setActionMsg] = useState<Record<string, string>>({});

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const { ok } = await verifyAdmin(secret);
    if (!ok) {
      setError(t.wrongPassword);
      return;
    }
    setLoggedIn(true);
    await loadQuestions();
  }

  async function loadQuestions() {
    setLoading(true);
    const res = await getPendingQuestions(secret);
    if (res.data) setQuestions(res.data);
    setLoading(false);
  }

  async function handleApprove(id: string) {
    const res = await approveQuestion(secret, id);
    if (!res.error) {
      setActionMsg((prev) => ({ ...prev, [id]: t.approved }));
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  }

  async function handleReject(id: string) {
    const res = await rejectQuestion(secret, id);
    if (!res.error) {
      setActionMsg((prev) => ({ ...prev, [id]: t.rejected }));
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:border-primary focus:outline-none";

  if (!loggedIn) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <h1 className="mb-6 text-2xl font-bold">{t.title}</h1>
        {error && (
          <div className="mb-4 rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              {t.passwordLabel}
            </label>
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder={t.passwordPlaceholder}
              className={inputClass}
              required
            />
          </div>
          <Button type="submit">{t.login}</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t.pending}</h1>
        <Button
          variant="ghost"
          onClick={() => {
            setLoggedIn(false);
            setSecret("");
          }}
        >
          {t.logout}
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-xl bg-card"
            />
          ))}
        </div>
      ) : questions.length === 0 ? (
        <p className="text-muted">{t.noPending}</p>
      ) : (
        <div className="flex flex-col gap-4">
          {questions.map((q) => (
            <div
              key={q.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted">
                <span className="rounded-full bg-primary/15 px-2 py-0.5 font-medium text-primary">
                  {q.technology_name}
                </span>
                <span className="capitalize">{q.difficulty}</span>
                {q.level && <span>&middot; {q.level}</span>}
              </div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">
                {q.title}
              </h3>
              <p className="mb-4 text-sm text-foreground/80 whitespace-pre-wrap line-clamp-4">
                {q.answer}
              </p>
              <div className="flex gap-2">
                <Button onClick={() => handleApprove(q.id)}>
                  {t.approve}
                </Button>
                <Button variant="ghost" onClick={() => handleReject(q.id)}>
                  {t.reject}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
