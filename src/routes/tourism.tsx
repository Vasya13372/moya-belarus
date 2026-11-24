import braslav from "@/assets/braslav-lakes.jpg";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Clock, Compass, Loader2, MapPin, Search, X } from "lucide-react";
import hero from "@/assets/belovezhskaya-path.jpg";
import mir from "@/assets/mir-castle.jpg";
import nesvizh from "@/assets/nesvizh-castle.jpg";
import pushcha from "@/assets/belovezhskaya-path.jpg";
import minsk from "@/assets/minsk-skyline.jpg";
import stork from "@/assets/stork.jpg";
import zubr from "@/assets/zubr.jpg";
import { ArticleHero } from "@/components/site/article-hero";
import { Reveal, SectionHead } from "@/components/site/reveal";
import { isInBelarus, mapEmbedUrl, parseSearch, parseSuggest, rankPlaces, searchUrl, suggestUrl, type Place } from "@/lib/place-search";

const DESC = "Замки, пущи, озёра и города Беларуси — и поиск любого места с фото, описанием и картой.";

export const Route = createFileRoute("/tourism")({
  head: () => ({
    meta: [
      { title: "Туризм по Беларуси — замки, пущи, озёра | Моя Беларусь" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Туризм — Моя Беларусь" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Tourism,
});

const TOC = [
  { id: "search", label: "Найти место" },
  { id: "places", label: "Must-see" },
  { id: "routes", label: "Маршруты" },
  { id: "tips", label: "Советы путешественнику" },
];

type Kind = "Все" | "Замки" | "Природа" | "Города";
const PLACES: { n: string; k: Exclude<Kind, "Все">; r: string; t: string; img: string; q: string }[] = [
  { n: "Мирский замок", k: "Замки", r: "Гродненская обл.", t: "Готика и ренессанс XVI века, объект ЮНЕСКО. Красный кирпич, белые наличники и пруд у стен.", img: mir, q: "Мирский замок" },
  { n: "Несвижский дворец", k: "Замки", r: "Минская обл.", t: "Резиденция Радзивиллов: парки, галереи и залы, восстановленные до мельчайших деталей.", img: nesvizh, q: "Несвижский замок" },
  { n: "Беловежская пуща", k: "Природа", r: "Брестская обл.", t: "Последний фрагмент первобытного леса Европы, дом зубров и резиденция Деда Мороза.", img: pushcha, q: "Беловежская пуща" },
  { n: "Минск", k: "Города", r: "Столица", t: "Широкие проспекты сталинского ампира, Троицкое предместье и Национальная библиотека-«алмаз».", img: minsk, q: "Минск" },
  { n: "Припятское Полесье", k: "Природа", r: "Гомельская обл.", t: "«Белорусская Амазония»: разливы рек, аисты на каждой крыше, деревни на сваях.", img: stork, q: "Припятский национальный парк" },
  { n: "Березинский заповедник", k: "Природа", r: "Витебская обл.", t: "Болота, бобры и вольеры с зубрами и медведями — один из старейших заповедников Европы.", img: zubr, q: "Березинский биосферный заповедник" },
  { n: "Браславские озёра", k: "Природа", r: "Витебская обл.", t: "Более 30 озёр ледникового происхождения, сосновые острова и смотровая гора Маяк.", img: braslav, q: "Браславские озёра" },
];

const ROUTES = [
  { d: "1 день", n: "Замковое кольцо", s: ["Минск", "Мир", "Несвиж", "Минск"], km: "280 км" },
  { d: "2 дня", n: "Брест и пуща", s: ["Брестская крепость", "Каменюки", "Беловежская пуща"], km: "120 км от Бреста" },
  { d: "3 дня", n: "Озёрный север", s: ["Полоцк", "Глубокое", "Браслав", "Нарочь"], km: "450 км" },
];

const TIPS = [
  { n: "Безвиз", t: "Граждане многих стран могут въехать без визы до 30 дней через аэропорт Минска." },
  { n: "Сезон", t: "Май–сентябрь — для природы и фестивалей; декабрь — для пущи и Деда Мороза." },
  { n: "Транспорт", t: "Поезда «Минск — областные центры» быстрые и недорогие, к замкам удобнее на авто." },
  { n: "Что попробовать", t: "Драники, мачанку, клецки, квас и «Белавежскую» в местных корчмах." },
];

const QUICK = ["Полоцк", "Брестская крепость", "Нарочь", "Гродно", "Хатынь", "Дудутки"];

function Tourism() {
  return (
    <main>
      <ArticleHero kicker="Раздел 04 · Путешествия" title="Туризм" lede="Замки, пущи, тысячи озёр и тихие городки. Найдите любое место — и узнайте о нём всё." image={hero} toc={TOC} />
      <PlaceSearch />
      <MustSee />
      <Routes />
      <Tips />
    </main>
  );
}

function useDebounced<T>(v: T, ms: number) {
  const [d, setD] = useState(v);
  useEffect(() => { const t = setTimeout(() => setD(v), ms); return () => clearTimeout(t); }, [v, ms]);
  return d;
}

function PlaceSearch() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [sugs, setSugs] = useState<string[]>([]);
  const [results, setResults] = useState<Place[] | null>(null);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dq = useDebounced(q, 250);
  const reqId = useRef(0);

  useEffect(() => {
    if (dq.trim().length < 2) { setSugs([]); return; }
    let live = true;
    fetch(suggestUrl(dq.trim()))
      .then((r) => r.json())
      .then((j: unknown) => { if (live) setSugs(parseSuggest(j)); })
      .catch(() => {});
    return () => { live = false; };
  }, [dq]);

  async function run(term: string) {
    const t = term.trim();
    if (!t) return;
    setQ(t); setOpen(false); setLoading(true); setError("");
    const id = ++reqId.current;
    try {
      const r = await fetch(searchUrl(t));
      if (!r.ok) throw new Error(String(r.status));
      let list = rankPlaces(parseSearch(await r.json()), t);
      if (!list.some(isInBelarus)) {
        const sj: unknown = await (await fetch(suggestUrl(t))).json();
        const first = parseSuggest(sj)[0];
        if (first) {
          const r2 = await fetch(searchUrl(first));
          const alt = r2.ok ? rankPlaces(parseSearch(await r2.json()), first) : [];
          if (alt.length && (alt.some(isInBelarus) || list.length === 0)) {
            list = alt;
            if (id === reqId.current) setQ(first);
          }
        }
      }
      if (id !== reqId.current) return;
      setResults(list); setActive(0);
    } catch {
      if (id === reqId.current) setError("Не удалось выполнить поиск. Проверьте подключение и попробуйте ещё раз.");
    } finally {
      if (id === reqId.current) setLoading(false);
    }
  }

  useEffect(() => {
    const h = (e: Event) => void run((e as CustomEvent<string>).detail);
    window.addEventListener("place-search", h);
    return () => window.removeEventListener("place-search", h);
  });

  const cur = results?.[active];

  return (
    <section id="search" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
      <SectionHead num="1" kicker="Поиск" title={<>Куда <em className="not-italic text-primary">поедем?</em></>} lede="Напишите город, замок, озеро или музей — покажем фото, описание и точку на карте." />
      <Reveal>
        <form onSubmit={(e) => { e.preventDefault(); void run(q); }} className="relative">
          <div className="flex items-center gap-3 rounded-full border border-border bg-card px-6 py-2 shadow-soft transition-colors focus-within:border-primary">
            <Search className="size-5 shrink-0 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setOpen(true); }}
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              placeholder="Например, Мирский замок или озеро Нарочь"
              aria-label="Поиск места"
              className="min-w-0 flex-1 bg-transparent py-3 text-lg outline-none placeholder:text-muted-foreground"
            />
            {q && <button type="button" aria-label="Очистить" onClick={() => { setQ(""); setSugs([]); }} className="text-muted-foreground hover:text-foreground"><X className="size-4" /></button>}
            <button type="submit" className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">Найти</button>
          </div>
          {open && sugs.length > 0 && (
            <ul className="absolute inset-x-4 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-border bg-popover shadow-soft animate-in fade-in slide-in-from-top-1">
              {sugs.map((s) => (
                <li key={s}><button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => void run(s)} className="flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-muted"><MapPin className="size-4 text-primary" />{s}</button></li>
              ))}
            </ul>
          )}
        </form>
        <div className="mt-5 flex flex-wrap gap-2">
          {QUICK.map((s) => (
            <button key={s} onClick={() => void run(s)} className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground">{s}</button>
          ))}
        </div>
      </Reveal>

      <div className="mt-12">
        {loading && <div className="flex items-center gap-3 text-muted-foreground"><Loader2 className="size-5 animate-spin" /> Ищем…</div>}
        {error && <p className="text-destructive">{error}</p>}
        {!loading && results && results.length === 0 && <p className="text-muted-foreground">Такого места не нашлось. Попробуйте уточнить название.</p>}
        {!loading && cur && results && (
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <article key={cur.id} className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft animate-in fade-in slide-in-from-bottom-2 duration-500">
              {cur.image && <img src={cur.image} alt={cur.title} className="aspect-[16/9] w-full object-cover" />}
              <div className="p-8">
                {cur.description && <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{cur.description}</div>}
                <h3 className="mt-2 font-display text-4xl">{cur.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{cur.extract || "Описание пока недоступно."}</p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm">
                  <a href={cur.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-medium text-primary">Читать подробнее <ArrowUpRight className="size-4" /></a>
                  {cur.lat !== undefined && cur.lon !== undefined && (
                    <a href={`https://www.openstreetmap.org/?mlat=${cur.lat}&mlon=${cur.lon}#map=13/${cur.lat}/${cur.lon}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"><Compass className="size-4" /> {cur.lat.toFixed(3)}, {cur.lon.toFixed(3)}</a>
                  )}
                </div>
              </div>
              {cur.lat !== undefined && cur.lon !== undefined && (
                <iframe title={`Карта: ${cur.title}`} src={mapEmbedUrl(cur.lat, cur.lon)} loading="lazy" className="h-72 w-full border-t border-border" />
              )}
            </article>
            <div className="flex flex-col gap-3">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Результаты · {results.length}</div>
              {results.map((p, i) => (
                <button key={p.id} onClick={() => setActive(i)} className={`flex items-center gap-4 rounded-2xl border p-3 text-left transition-all ${i === active ? "border-primary bg-card" : "border-border hover:bg-card"}`}>
                  {p.image ? <img src={p.image} alt="" loading="lazy" className="size-16 shrink-0 rounded-xl object-cover" /> : <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-muted"><MapPin className="size-5 text-muted-foreground" /></div>}
                  <div className="min-w-0">
                    <div className="truncate font-display text-lg">{p.title}</div>
                    <div className="line-clamp-2 text-sm text-muted-foreground">{p.description ?? p.extract}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function MustSee() {
  const [k, setK] = useState<Kind>("Все");
  const list = useMemo(() => PLACES.filter((p) => k === "Все" || p.k === k), [k]);
  return (
    <section id="places" className="scroll-mt-20 border-y border-border bg-muted/40 py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead num="2" kicker="Must-see" title={<>Семь мест, <em className="not-italic text-primary">ради которых едут</em></>} lede="Отфильтруйте по типу и нажмите на карточку, чтобы открыть место в поиске." />
        <div className="mb-8 inline-flex flex-wrap rounded-full border border-border bg-card p-1">
          {(["Все", "Замки", "Природа", "Города"] as const).map((x) => (
            <button key={x} onClick={() => setK(x)} className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${k === x ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{x}</button>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <a key={p.n} href="#search" onClick={() => window.dispatchEvent(new CustomEvent("place-search", { detail: p.q }))} className="group isolate overflow-hidden rounded-3xl border border-border bg-card shadow-soft animate-in fade-in duration-500 [transform:translateZ(0)]">
              <div className="aspect-[4/3] overflow-hidden"><img src={p.img} alt={p.n} loading="lazy" className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" /></div>
              <div className="p-6">
                <div className="flex items-center text-xs font-semibold uppercase tracking-[0.18em] text-primary">{p.k}<span className="ml-auto font-normal normal-case tracking-normal text-muted-foreground">{p.r}</span></div>
                <h3 className="mt-2 font-display text-2xl">{p.n}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.t}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Routes() {
  return (
    <section id="routes" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
      <SectionHead num="3" kicker="Маршруты" title="Готовые маршруты" lede="Проверенные связки, чтобы увидеть больше за короткое время." />
      <div className="grid gap-6 md:grid-cols-3">
        {ROUTES.map((r, i) => (
          <Reveal key={r.n} delay={i * 100}>
            <div className="h-full rounded-3xl border border-border bg-card p-8">
              <div className="flex items-center gap-2 text-sm text-primary"><Clock className="size-4" /> {r.d}<span className="ml-auto text-muted-foreground">{r.km}</span></div>
              <h3 className="mt-3 font-display text-3xl">{r.n}</h3>
              <ol className="mt-6 space-y-3 border-l border-border pl-5">
                {r.s.map((s) => <li key={s} className="relative before:absolute before:-left-[25px] before:top-2 before:size-2 before:rounded-full before:bg-primary">{s}</li>)}
              </ol>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Tips() {
  return (
    <section id="tips" className="scroll-mt-20 border-t border-border bg-muted/40 py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead num="4" kicker="Советы" title="Перед поездкой" lede="Коротко о главном, что пригодится в дороге." />
        <div className="grid gap-6 sm:grid-cols-2">
          {TIPS.map((t, i) => (
            <Reveal key={t.n} delay={i * 80}>
              <div className="rounded-2xl border border-border bg-card p-7"><div className="font-display text-2xl">{t.n}</div><p className="mt-2 text-muted-foreground">{t.t}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
