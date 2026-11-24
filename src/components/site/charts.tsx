import { useState } from "react";
import { AGE_GROUPS, AGE_STATS, LAND_USE, POPULATION_HISTORY, URBAN_BY_REGION } from "@/lib/belarus-data";
import { useInView } from "./reveal";

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{children}</div>
);

export function PopulationChart() {
  const { ref, shown } = useInView<HTMLDivElement>(0.3);
  const data = POPULATION_HISTORY;
  const [idx, setIdx] = useState(data.length - 1);
  const W = 800, H = 320, pad = { l: 72, r: 40, t: 30, b: 40 };
  const minY = 7.5, maxY = 10.6;
  const x0 = data[0]!.year, x1 = data[data.length - 1]!.year;
  const sx = (y: number) => pad.l + ((y - x0) / (x1 - x0)) * (W - pad.l - pad.r);
  const sy = (v: number) => pad.t + (1 - (v - minY) / (maxY - minY)) * (H - pad.t - pad.b);
  const pts = data.map((d) => [sx(d.year), sy(d.value)] as const);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join("");
  const area = `${line}L${sx(x1)},${H - pad.b}L${sx(x0)},${H - pad.b}Z`;
  const cur = data[idx]!;
  const cp = pts[idx]!;

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * W;
    let best = 0;
    pts.forEach((p, i) => { if (Math.abs(p[0] - x) < Math.abs(pts[best]![0] - x)) best = i; });
    setIdx(best);
  };

  return (
    <div ref={ref} data-shown={shown} className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Label>Население, млн человек</Label>
          <div className="mt-2 flex items-baseline gap-3">
            <span key={cur.year} className="animate-in fade-in slide-in-from-bottom-2 font-display text-5xl tracking-tight md:text-6xl">
              {cur.value.toLocaleString("ru-RU", { minimumFractionDigits: 2 })}
            </span>
            <span className="text-lg text-muted-foreground">в {cur.year} г.{cur.year === 2026 ? " (оценка)" : ""}</span>
          </div>
        </div>
        <p className="max-w-xs text-sm text-muted-foreground">Пик пришёлся на 1994 год — 10,24 млн. Проведите по графику, чтобы увидеть каждую перепись.</p>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-6 w-full touch-none select-none" onPointerMove={onMove}>
        <defs>
          <linearGradient id="popfill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--chart-1)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[8, 9, 10].map((v) => (
          <g key={v}>
            <line x1={pad.l} x2={W - pad.r} y1={sy(v)} y2={sy(v)} stroke="var(--border)" strokeDasharray="4 6" />
            <text x={pad.l - 14} y={sy(v) + 4} textAnchor="end" className="fill-muted-foreground text-[12px]">{v} млн</text>
          </g>
        ))}
        <path d={area} fill="url(#popfill)" className={`transition-opacity duration-1000 ${shown ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "800ms" }} />
        <path d={line} fill="none" stroke="var(--chart-1)" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" className="draw-line" />
        <line x1={cp[0]} x2={cp[0]} y1={pad.t - 10} y2={H - pad.b} stroke="var(--foreground)" strokeOpacity={0.25} className="transition-all duration-300" />
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={i === idx ? 8 : 4} fill={i === idx ? "var(--chart-1)" : "var(--card)"} stroke="var(--chart-1)" strokeWidth={2.5} className="transition-all duration-300" />
        ))}
        {data.map((d, i) => {
          const near = (j: number) => j >= 0 && j < pts.length && Math.abs(pts[j]![0] - pts[i]![0]) < 46;
          const hidden = i !== idx && ((near(idx) && idx !== i) || (near(i + 1) && i + 1 < pts.length));
          return hidden ? null : (
          <text key={d.year} x={pts[i]![0]} y={H - 12} textAnchor="middle" className={`text-[13px] transition-colors ${i === idx ? "fill-foreground font-semibold" : "fill-muted-foreground"}`}>{d.year}</text>
          );
        })}
      </svg>
    </div>
  );
}

function arc(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) {
  const p = (r: number, a: number) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const large = a1 - a0 > Math.PI ? 1 : 0;
  const [x0, y0] = p(r1, a0), [x1, y1] = p(r1, a1), [x2, y2] = p(r0, a1), [x3, y3] = p(r0, a0);
  return `M${x0},${y0}A${r1},${r1} 0 ${large} 1 ${x1},${y1}L${x2},${y2}A${r0},${r0} 0 ${large} 0 ${x3},${y3}Z`;
}

export function AgeDonut() {
  const { ref, shown } = useInView<HTMLDivElement>(0.3);
  const [hover, setHover] = useState(1);
  const g = AGE_GROUPS[hover]!;
  const gap = 0.04;
  let acc = -Math.PI / 2;
  const segs = AGE_GROUPS.map((a) => {
    const a0 = acc, a1 = acc + (a.share / 100) * Math.PI * 2;
    acc = a1;
    return { a0: a0 + gap / 2, a1: a1 - gap / 2, mid: (a0 + a1) / 2 };
  });
  return (
    <div ref={ref} className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
      <Label>Возрастная структура</Label>
      <div className="mt-6 flex flex-1 flex-col items-center gap-8 sm:flex-row">
        <div className="relative size-60 shrink-0">
          <svg viewBox="0 0 240 240" className={`size-full overflow-visible transition-all duration-1000 ${shown ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}>
            {AGE_GROUPS.map((a, i) => {
              const s = segs[i]!;
              const on = hover === i;
              const dx = on ? Math.cos(s.mid) * 8 : 0, dy = on ? Math.sin(s.mid) * 8 : 0;
              return (
                <path
                  key={a.label}
                  d={arc(120, 120, on ? 70 : 76, on ? 116 : 108, s.a0, s.a1)}
                  fill={a.token}
                  opacity={on ? 1 : 0.45}
                  transform={`translate(${dx} ${dy})`}
                  className="cursor-pointer transition-all duration-500 ease-out"
                  onMouseEnter={() => setHover(i)}
                  onClick={() => setHover(i)}
                />
              );
            })}
          </svg>
          <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
            <div key={hover} className="animate-in fade-in zoom-in-90 duration-300">
              <div className="font-display text-5xl">{g.share}%</div>
              <div className="text-xs text-muted-foreground">{g.range}</div>
            </div>
          </div>
        </div>
        <ul className="w-full space-y-2">
          {AGE_GROUPS.map((a, i) => (
            <li key={a.label}>
              <button
                onMouseEnter={() => setHover(i)}
                onClick={() => setHover(i)}
                className={`group relative w-full overflow-hidden rounded-xl border px-4 py-3 text-left transition-all duration-300 ${hover === i ? "border-foreground/15 bg-muted" : "border-transparent"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="size-3 rounded-full transition-transform duration-300 group-hover:scale-125" style={{ background: a.token }} />
                  <span className="flex-1 text-sm">{a.label}</span>
                  <span className="font-display text-lg">{a.share}%</span>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-background/60">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: shown ? `${a.share}%` : "0%", background: a.token }} />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
        {AGE_STATS.map((s) => (
          <div key={s.k} className="bg-card p-4 transition-colors hover:bg-muted">
            <div className="font-display text-2xl">{s.v}<span className="ml-1 text-sm text-muted-foreground">{s.unit}</span></div>
            <div className="mt-0.5 text-xs text-muted-foreground">{s.k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UrbanRural() {
  const { ref, shown } = useInView<HTMLDivElement>(0.3);
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div ref={ref} className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
      <Label>Город и село</Label>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-5xl">{hover === null ? 78 : URBAN_BY_REGION[hover]!.share}%</span>
        <span className="text-muted-foreground">{hover === null ? "живут в городах" : URBAN_BY_REGION[hover]!.name}</span>
      </div>
      <div className="mt-5 flex h-3 overflow-hidden rounded-full">
        <div className="bg-chart-1 transition-all duration-1000" style={{ width: shown ? "78%" : "0%" }} />
        <div className="flex-1 bg-chart-2" />
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>Город — 78%</span><span>Село — 22%</span>
      </div>
      <ul className="mt-6 flex-1 space-y-1" onMouseLeave={() => setHover(null)}>
        {URBAN_BY_REGION.map((r, i) => (
          <li key={r.name} onMouseEnter={() => setHover(i)} className={`grid cursor-default grid-cols-[100px_1fr_36px] items-center gap-3 rounded-lg px-2 py-1.5 text-xs transition-colors ${hover === i ? "bg-muted" : ""}`}>
            <span className={hover === i ? "text-foreground" : "text-muted-foreground"}>{r.name}</span>
            <span className="h-1.5 overflow-hidden rounded-full bg-muted">
              <span className="block h-full rounded-full bg-chart-1 transition-all duration-700" style={{ width: shown ? `${r.share}%` : "0%", transitionDelay: `${i * 80}ms`, opacity: hover === null || hover === i ? 1 : 0.35 }} />
            </span>
            <span className="text-right font-medium tabular-nums">{r.share}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LandUse() {
  const { ref, shown } = useInView<HTMLDivElement>(0.3);
  const [active, setActive] = useState(0);
  const a = LAND_USE[active]!;
  const widths = LAND_USE.map((l) => Math.max(l.share, 4));
  const sum = widths.reduce((s, w) => s + w, 0);
  return (
    <div ref={ref} className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
      <Label>Состав территории · 207 600 км²</Label>
      <div key={active} className="mt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <span className="font-display text-5xl md:text-6xl">{a.share}%</span>
        <span className="ml-3 text-lg">{a.label}</span>
        <p className="mt-1 text-sm text-muted-foreground">{a.note} · ≈ {Math.round((207600 * a.share) / 100).toLocaleString("ru-RU")} км²</p>
      </div>
      <div className="mt-8 flex h-20 items-end gap-1.5">
        {LAND_USE.map((l, i) => (
          <button
            key={l.label}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-label={l.label}
            className="relative h-full origin-bottom rounded-lg outline-none transition-[opacity,transform,width] duration-500 ease-out"
            style={{
              width: shown ? `${(widths[i]! / sum) * 100}%` : "0%",
              background: l.token,
              opacity: active === i ? 1 : 0.35,
              transform: active === i ? "scaleY(1)" : "scaleY(0.8)",
              transitionDelay: shown ? "0ms" : `${i * 120}ms`,
            }}
          />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {LAND_USE.map((l, i) => (
          <button key={l.label} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors ${active === i ? "bg-muted text-foreground" : "text-muted-foreground"}`}>
            <span className="size-2.5 rounded-full" style={{ background: l.token }} />
            {l.label} <span className="ml-auto tabular-nums">{l.share}%</span>
          </button>
        ))}
      </div>
    </div>
  );
}
