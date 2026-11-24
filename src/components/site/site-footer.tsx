import { Link } from "@tanstack/react-router";
import { ArrowUp } from "lucide-react";
import { BrandMark } from "./brand-mark";

const COLS = [
  { t: "Разделы", links: [["/", "Главная"], ["/history", "История"], ["/culture", "Культура"]] },
  { t: "Ещё", links: [["/tourism", "Туризм"], ["/traditions", "Традиции"], ["/quiz", "Викторина"]] },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <BrandMark className="size-9 text-primary" />
              <span className="font-display text-2xl">Моя Беларусь</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Живая энциклопедия страны: регионы, люди, природа, культура и традиции — в одном месте.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.t}>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{c.t}</div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map(([to, l]) => (
                  <li key={to}>
                    <Link to={to} className="group inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary">
                      <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" />
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Источники</div>
            <ul className="mt-4 space-y-2.5 text-sm text-foreground/80">
              <li>Белстат, перепись 2019</li>
              <li>Оценки на 2026 год</li>
              <li>UNESCO World Heritage</li>
              <li>Wikimedia Commons</li>
            </ul>
          </div>
        </div>
        <div className="relative mt-16 select-none overflow-hidden">
          <div className="font-display text-[22vw] leading-[0.8] tracking-tighter text-foreground/[0.04] md:text-[15rem]">Беларусь</div>
        </div>
        <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>© 2026 Моя Беларусь · Сделано с любовью к роднай зямлі</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground">
            Наверх <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
