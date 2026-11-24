import { useState } from "react";
import { MapPin, Ruler, Users, Landmark } from "lucide-react";
import { CITY_POINTS, MAP_H, MAP_W, REGION_PATHS } from "@/lib/belarus-geo";
import { MINSK_CITY, REGIONS } from "@/lib/belarus-data";
import { useInView } from "./reveal";

const fmt = (n: number) => n.toLocaleString("ru-RU");

export function RegionMap() {
  const [active, setActive] = useState<string>("minsk");
  const [hover, setHover] = useState<string | null>(null);
  const { ref, shown } = useInView<HTMLDivElement>(0.2);
  const current = REGIONS.find((r) => r.id === (hover ?? active)) ?? REGIONS[4]!;
  const total = REGIONS.reduce((s, r) => s + r.area, 0) + MINSK_CITY.area;

  return (
    <div ref={ref} data-shown={shown} className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr]">
      <div className="reveal relative" data-shown={shown}>
        <svg viewBox={`-20 -20 ${MAP_W + 40} ${MAP_H + 40}`} className="w-full overflow-visible" role="img" aria-label="Карта областей Беларуси">
          {REGIONS.map((r, i) => (
            <path
              key={r.id}
              d={REGION_PATHS[r.id]}
              className="region"
              data-active={(hover ?? active) === r.id}
              
              onMouseEnter={() => setHover(r.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setActive(r.id)}
            >
              <title>{r.name}</title>
            </path>
          ))}
          {REGIONS.map((r) => {
            const p = CITY_POINTS[r.id]!;
            const on = (hover ?? active) === r.id;
            return (
              <g key={r.id} className="pointer-events-none">
                <circle cx={p[0]} cy={p[1]} r={on ? 9 : 6} className="city-dot" />
                <text
                  x={p[0]}
                  y={p[1] - 18}
                  textAnchor="middle"
                  className={`fill-foreground font-sans text-[22px] font-semibold transition-opacity duration-300 ${on ? "opacity-100" : "opacity-60"}`}
                >
                  {r.center}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="reveal" data-shown={shown} style={{ ["--d" as string]: "200ms" }}>
        <div key={current.id} className="animate-in fade-in slide-in-from-bottom-3 duration-500 rounded-2xl border border-border bg-card p-7 shadow-soft">
          <div className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Область</div>
          <h3 className="font-display text-3xl tracking-tight">{current.name}</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{current.fact}</p>
          <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
            {[
              { icon: Landmark, k: "Центр", v: current.center },
              { icon: MapPin, k: "Основан", v: `${current.founded} г.` },
              { icon: Ruler, k: "Площадь", v: `${fmt(current.area)} км²` },
              { icon: Users, k: "Население", v: `${fmt(current.population)} тыс.` },
            ].map(({ icon: Icon, k, v }) => (
              <div key={k} className="bg-card p-4">
                <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Icon className="size-3.5" strokeWidth={1.75} /> {k}
                </dt>
                <dd className="mt-1 font-display text-xl">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs text-muted-foreground">
              <span>Доля территории страны</span>
              <span>{((current.area / total) * 100).toFixed(1)}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${(current.area / 40372) * 100}%` }} />
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => setActive(r.id)}
              onMouseEnter={() => setHover(r.id)}
              onMouseLeave={() => setHover(null)}
              className={`rounded-full border px-3.5 py-1.5 text-xs transition-all ${
                active === r.id ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {r.center}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
