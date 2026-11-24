import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UNESCO } from "@/lib/belarus-data";
import pushcha from "@/assets/belovezhskaya-path.jpg";
import mir from "@/assets/mir-castle.jpg";
import nesvizh from "@/assets/nesvizh-castle.jpg";
import minsk from "@/assets/minsk-skyline.jpg";
import kupalle from "@/assets/kupalle-night.jpg";
import straw from "@/assets/straw-craft.jpg";

const IMG: Record<string, string> = { pushcha: pushcha, mir: mir, nesvizh: nesvizh, minsk: minsk, kupalle: kupalle, straw: straw };
const DUR = 6500;

export function UnescoStrip() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((v) => (v + 1) % UNESCO.length), DUR);
    return () => clearTimeout(t);
  }, [i, paused]);
  const cur = UNESCO[i]!;
  const go = (d: number) => setI((v) => (v + d + UNESCO.length) % UNESCO.length);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft isolate [transform:translateZ(0)]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative h-[420px] overflow-hidden md:h-[480px]">
        {UNESCO.map((u, k) => (
          <img key={u.name} src={IMG[u.img]} alt={u.name} loading={k ? "lazy" : undefined}
            className={`absolute inset-0 size-full object-cover transition-all duration-[1.2s] ease-out ${k === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} />
        ))}
        <div className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent" />
        <div className="absolute top-5 left-5 rounded-full border border-hero-ink/30 bg-ink-dark/40 px-3 py-1 text-xs font-medium text-hero-ink backdrop-blur">
          Всемирное наследие ЮНЕСКО · {i + 1}/{UNESCO.length}
        </div>
        <div className="absolute top-5 right-5 flex gap-2">
          {[[-1, ChevronLeft], [1, ChevronRight]].map(([d, Icon]) => {
            const I2 = Icon as typeof ChevronLeft;
            return (
              <button key={d as number} onClick={() => go(d as number)} aria-label={d === 1 ? "Дальше" : "Назад"}
                className="grid size-10 place-items-center rounded-full border border-hero-ink/30 bg-ink-dark/40 text-hero-ink backdrop-blur transition-all hover:scale-110 hover:bg-hero-ink hover:text-ink-dark">
                <I2 className="size-4" />
              </button>
            );
          })}
        </div>
        <div key={i} className="absolute inset-x-0 bottom-0 p-7 md:p-10">
          <div className="animate-rise text-xs font-semibold uppercase tracking-[0.18em] text-primary">{cur.type} · с {cur.year} г.</div>
          <h3 className="animate-rise mt-2 font-display text-4xl tracking-tight md:text-5xl" style={{ ["--d" as string]: "80ms" }}>{cur.name}</h3>
          <p className="animate-rise mt-3 max-w-xl text-muted-foreground" style={{ ["--d" as string]: "160ms" }}>{cur.text}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 border-t border-border md:grid-cols-6">
        {UNESCO.map((u, k) => (
          <button key={u.name} onClick={() => setI(k)}
            className={`group relative border-border px-4 py-4 text-left transition-colors [&:not(:last-child)]:border-r ${k === i ? "bg-muted" : "hover:bg-muted/60"}`}>
            <span className="absolute inset-x-0 top-0 h-0.5 bg-border">
              {k === i && <span key={`${i}-${paused}`} className="progress-fill block h-full bg-primary" style={{ ["--dur" as string]: `${DUR}ms`, animationPlayState: paused ? "paused" : "running" }} />}
              {k < i && <span className="block h-full bg-primary/40" />}
            </span>
            <span className="block text-[11px] tabular-nums text-muted-foreground">{u.year}</span>
            <span className={`mt-0.5 block text-sm leading-snug transition-colors ${k === i ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>{u.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
