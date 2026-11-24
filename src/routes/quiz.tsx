import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, RotateCcw, Shuffle, Trophy, X } from "lucide-react";
import mir from "@/assets/mir-castle.jpg";
import { pickQuestions, type Question } from "@/lib/quiz";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Викторина о Беларуси — история, традиции, природа" },
      { name: "description", content: "Десять случайных вопросов о Беларуси: от Полоцка и Скорины до Купалья и Нарочи. Каждый раз — новый набор." },
      { property: "og:title", content: "Викторина о Беларуси — Моя Беларусь" },
      { property: "og:description", content: "Проверьте, насколько хорошо вы знаете историю и традиции Беларуси." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Quiz,
});

const ROUND = 10;
const L = ["А", "Б", "В", "Г"];

function verdict(s: number) {
  if (s >= 9) return "Знаток! Вам можно водить экскурсии.";
  if (s >= 7) return "Отлично — вы хорошо знаете Беларусь.";
  if (s >= 4) return "Неплохо! Загляните в разделы энциклопедии.";
  return "Самое время отправиться в путешествие по сайту.";
}

function Quiz() {
  const [qs, setQs] = useState<Question[] | null>(null);
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const start = () => { setQs(pickQuestions(ROUND)); setI(0); setPick(null); setScore(0); };
  useEffect(start, []);

  const done = qs !== null && i >= qs.length;
  const q = qs?.[i];
  const choose = (k: number) => {
    if (pick !== null || !q) return;
    setPick(k);
    if (k === q.answer) setScore((s) => s + 1);
  };

  return (
    <main className="relative min-h-[100svh] overflow-hidden">
      <img src={mir} alt="" className="absolute inset-0 size-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
      <div className="relative mx-auto max-w-3xl px-5 pt-32 pb-24">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Раздел 06 · Викторина</div>
          <h1 className="mt-3 font-display text-5xl tracking-tight md:text-7xl">Что вы знаете о Беларуси?</h1>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{ROUND} случайных вопросов из большой базы — история, культура, традиции и природа.</p>
        </div>

        <div className="mt-12 rounded-3xl border border-border bg-card/90 p-6 shadow-soft backdrop-blur md:p-10">
          {!qs && <div className="h-64" />}
          {q && !done && (
            <div key={i} className="animate-in fade-in slide-in-from-bottom-3 duration-500">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="rounded-full border border-border px-3 py-1 uppercase tracking-[0.16em]">{q.topic}</span>
                <span className="tabular-nums">Вопрос {i + 1} из {qs!.length} · Счёт {score}</span>
              </div>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary transition-all duration-500" style={{ width: `${(i / qs!.length) * 100}%` }} /></div>
              <h2 className="mt-8 font-display text-3xl leading-snug md:text-4xl">{q.q}</h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {q.options.map((o, k) => {
                  const state = pick === null ? "idle" : k === q.answer ? "right" : k === pick ? "wrong" : "dim";
                  return (
                    <button key={o} onClick={() => choose(k)} disabled={pick !== null}
                      className={`group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                        state === "idle" ? "border-border hover:-translate-y-0.5 hover:border-primary/60 hover:bg-muted" :
                        state === "right" ? "border-flag-green bg-flag-green/15" :
                        state === "wrong" ? "border-destructive bg-destructive/15" : "border-border opacity-50"}`}>
                      <span className={`grid size-9 shrink-0 place-items-center rounded-full border text-sm font-semibold ${state === "right" ? "border-flag-green bg-flag-green text-hero-ink" : state === "wrong" ? "border-destructive bg-destructive text-hero-ink" : "border-border"}`}>
                        {state === "right" ? <Check className="size-4" /> : state === "wrong" ? <X className="size-4" /> : L[k]}
                      </span>
                      <span>{o}</span>
                    </button>
                  );
                })}
              </div>
              {pick !== null && (
                <div className="mt-6 flex animate-in fade-in flex-col gap-4 rounded-2xl bg-muted p-5 duration-300 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground"><b className="text-foreground">{pick === q.answer ? "Верно! " : "Не совсем. "}</b>{q.note}</p>
                  <button onClick={() => { setI(i + 1); setPick(null); }} className="shrink-0 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-105">
                    {i + 1 < qs!.length ? "Дальше" : "Результат"}
                  </button>
                </div>
              )}
            </div>
          )}
          {done && (
            <div className="animate-in fade-in zoom-in-95 py-6 text-center duration-500">
              <Trophy className="mx-auto size-12 text-primary" strokeWidth={1.5} />
              <div className="mt-4 font-display text-7xl tabular-nums">{score}<span className="text-3xl text-muted-foreground"> / {qs!.length}</span></div>
              <p className="mt-3 text-lg text-muted-foreground">{verdict(score)}</p>
              <div className="mt-8 flex justify-center gap-3">
                <button onClick={start} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-transform hover:scale-105"><Shuffle className="size-4" /> Новые вопросы</button>
              </div>
            </div>
          )}
        </div>
        {qs && !done && (
          <button onClick={start} className="mx-auto mt-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><RotateCcw className="size-3.5" /> Перемешать заново</button>
        )}
      </div>
    </main>
  );
}
