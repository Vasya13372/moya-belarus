import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { MAP_H, MAP_W, REGION_PATHS } from "@/lib/belarus-geo";
import { useInView } from "./reveal";

export const toMap = (lon: number, lat: number): [number, number] => [(lon - 23.18) * 104.3, 719.7 - (lat - 52.1) * 176.2];

export type EraPlace = { name: string; lon: number; lat: number };
export type EraMeta = { id: string; name: string; from: number; to: number; places: EraPlace[] };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setP(clamp(-r.top / Math.max(1, r.height - window.innerHeight)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  return { ref, p };
}

export function VideoPrologue({ video, poster, eras }: { video: string; poster: string; eras: EraMeta[] }) {
  const { ref, p } = useSectionProgress<HTMLElement>();
  const intro = 1 - seg(p, 0, 0.3);
  const frame = seg(p, 0.15, 0.55);
  const rewind = seg(p, 0.35, 0.85);
  const outro = seg(p, 0.85, 1);
  const year = Math.round(2026 - (2026 - 862) * (1 - Math.pow(1 - rewind, 3)));
  const inset = frame * 9;
  const first = eras[0]!.from, last = 2026;
  return (
    <section ref={ref} className="relative h-[320vh] bg-ink-dark">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0 isolate [transform:translateZ(0)]"
          style={{ clipPath: `inset(${inset}% ${inset * 0.7}% ${inset * 1.6}% ${inset * 0.7}% round ${frame * 28}px)`, opacity: 1 - outro * 0.6 }}>
          <video src={video} poster={poster} autoPlay muted loop playsInline preload="auto" aria-hidden="true" disablePictureInPicture
            className="absolute inset-0 size-full object-cover" style={{ transform: `scale(${1.08 - frame * 0.08})` }} />
          <div className="bg-prologue-veil absolute inset-0" style={{ opacity: 0.55 + frame * 0.35 }} />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center text-hero-ink"
          style={{ opacity: intro, transform: `translateY(${-(1 - intro) * 80}px)`, pointerEvents: intro > 0.2 ? "auto" : "none" }}>
          <div className="animate-rise text-xs font-medium uppercase tracking-[0.25em] text-hero-ink/75">Раздел 02 · История</div>
          <h1 className="animate-rise text-shadow-hero mt-5 font-display text-6xl font-light leading-[0.95] tracking-tight sm:text-7xl md:text-8xl" style={{ ["--d" as string]: "150ms" }}>Тысяча лет</h1>
          <p className="animate-rise text-shadow-hero mt-6 max-w-lg text-lg text-hero-ink/85" style={{ ["--d" as string]: "300ms" }}>Листайте — и пролетите сквозь века белорусской земли, от Полоцка до наших дней.</p>
          <ArrowDown className="mt-12 size-5 animate-bounce text-hero-ink/70" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center text-hero-ink"
          style={{ opacity: seg(p, 0.3, 0.42) }}>
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Отматываем время</div>
          <div className="text-shadow-hero mt-4 font-display text-[22vw] font-light leading-none tabular-nums md:text-[13rem]">{year}</div>
          <div className="mt-4 h-6 font-display text-2xl text-hero-ink/85" style={{ opacity: seg(p, 0.8, 0.9) }}>
            Полоцк впервые упомянут в летописи
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-5xl px-5 pb-[6svh]" style={{ opacity: seg(p, 0.4, 0.55) }}>
          <div className="relative h-10">
            <div className="absolute inset-x-0 top-1/2 h-px bg-hero-ink/25" />
            <div className="absolute left-0 top-1/2 h-px bg-gold" style={{ width: `${(1 - rewind) * 100}%`, right: "auto" }} />
            {eras.map((e) => {
              const x = ((e.from - first) / (last - first)) * 100;
              return (
                <div key={e.id} className="absolute top-0 flex h-full flex-col items-center" style={{ left: `${x}%` }}>
                  <span className="mt-[14px] size-2.5 rounded-full border border-hero-ink/70 bg-ink-dark" />
                  <span className="mt-1.5 hidden whitespace-nowrap text-[11px] tabular-nums text-hero-ink/70 sm:block">{e.from}</span>
                </div>
              );
            })}
            <div className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold ring-4 ring-gold/25"
              style={{ left: `${((year - first) / (last - first)) * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function EraRibbon({ eras, active, onPick }: { eras: EraMeta[]; active: number; onPick: (i: number) => void }) {
  const { ref, shown } = useInView<HTMLDivElement>(0.3);
  const longest = Math.max(...eras.map((e) => e.to - e.from));
  return (
    <div ref={ref} data-shown={shown} className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border isolate [transform:translateZ(0)] sm:grid-cols-3 lg:grid-cols-6">
      {eras.map((e, i) => (
        <button key={e.id} type="button" onClick={() => onPick(i)} data-active={i === active}
          className="era-tab group flex flex-col gap-3 p-5 text-left">
          <span className="font-display text-sm tabular-nums text-muted-foreground transition-colors group-data-[active=true]:text-primary">
            {e.from} — {e.to === 2026 ? "н. в." : e.to}
          </span>
          <span className="min-h-[2.6em] font-display text-lg leading-tight">{e.name}</span>
          <span className="h-1 w-full overflow-hidden rounded-full bg-muted">
            <span className="era-bar block h-full rounded-full" style={{ width: `${((e.to - e.from) / longest) * 100}%`, ["--d" as string]: `${i * 110}ms` }} />
          </span>
          <span className="text-xs text-muted-foreground">{e.to - e.from} лет</span>
        </button>
      ))}
    </div>
  );
}

export function EraMap({ eras, active }: { eras: EraMeta[]; active: number }) {
  const era = eras[active]!;
  return (
    <svg key={era.id} viewBox={`-30 -30 ${MAP_W + 60} ${MAP_H + 60}`} className="w-full overflow-visible" role="img" aria-label={`Места эпохи: ${era.name}`}>
      {Object.entries(REGION_PATHS).map(([id, d]) => <path key={id} d={d} className="region pointer-events-none" />)}
      {era.places.map((pl) => {
        const [x, y] = toMap(pl.lon, pl.lat);
        return (
          <g key={`${era.id}-${pl.name}`} className="animate-in fade-in zoom-in-50 duration-500">
            <circle cx={x} cy={y} r={14} className="map-halo" />
            <circle cx={x} cy={y} r={7} className="city-dot" />
            <text x={x} y={y - 24} textAnchor="middle" className="map-label font-sans text-[24px] font-semibold">{pl.name}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function ChronicleAtlas({ eras, descr }: { eras: EraMeta[]; descr: Record<string, string> }) {
  const [active, setActive] = useState(0);
  const era = eras[active]!;
  return (
    <div className="space-y-10">
      <EraRibbon eras={eras} active={active} onPick={setActive} />
      <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
        <EraMap eras={eras} active={active} />
        <div key={era.id} className="animate-in fade-in slide-in-from-bottom-3 rounded-2xl border border-border bg-card p-7 shadow-soft duration-500">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{era.from} — {era.to === 2026 ? "наши дни" : era.to}</div>
          <h3 className="mt-2 font-display text-3xl tracking-tight">{era.name}</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{descr[era.id]}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {era.places.map((pl) => <li key={pl.name} className="rounded-full border border-border px-3 py-1 text-sm">{pl.name}</li>)}
          </ul>
          <div className="mt-6 flex items-center justify-between text-sm">
            <button type="button" className="text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30" disabled={active === 0} onClick={() => setActive(active - 1)}>← Раньше</button>
            <span className="tabular-nums text-muted-foreground">{active + 1} / {eras.length}</span>
            <button type="button" className="text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30" disabled={active === eras.length - 1} onClick={() => setActive(active + 1)}>Позже →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function YearRail({ facts }: { facts: string[] }) {
  const { ref, shown } = useInView<HTMLOListElement>(0.3);
  return (
    <ol ref={ref} data-shown={shown} className="year-rail relative mt-8 space-y-5 pl-8">
      {facts.map((f, i) => {
        const [y, ...rest] = f.split(" — ");
        return (
          <li key={f} className="reveal relative" data-shown={shown} style={{ ["--d" as string]: `${200 + i * 140}ms` }}>
            <span className="absolute -left-8 top-2 size-3 rounded-full border-2 border-gold bg-background" />
            <div className="font-display text-3xl leading-none text-primary tabular-nums">{y}</div>
            <div className="mt-1 text-muted-foreground">{rest.join(" — ")}</div>
          </li>
        );
      })}
    </ol>
  );
}
