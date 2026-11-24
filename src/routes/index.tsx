import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Droplets, Map as MapIcon, Mountain, Trees, Users, Waves } from "lucide-react";
import { UnescoStrip } from "@/components/site/unesco-strip";
import kupalle from "@/assets/kupalle-night.jpg";
import costume from "@/assets/folk-costume.jpg";
import nesvizh from "@/assets/nesvizh-castle.jpg";
import nesvizhHero from "@/assets/nesvizh-castle-hero.jpg";
import { CountUp, Reveal, SectionHead, useInView } from "@/components/site/reveal";
import { RegionMap } from "@/components/site/region-map";
import { AgeDonut, LandUse, PopulationChart, UrbanRural } from "@/components/site/charts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Беларусь — страна, регионы, люди и природа | Моя Беларусь" },
      { name: "description", content: "Главное о Беларуси: интерактивная карта областей, население, возрастная структура и состав территории." },
      { property: "og:title", content: "Беларусь — живая энциклопедия страны" },
      { property: "og:description", content: "Интерактивная карта областей, население и природа Беларуси." },
    ],
  }),
  component: Index,
});

const TOC = [
  { id: "facts", label: "Страна в цифрах" },
  { id: "regions", label: "Области и их центры" },
  { id: "people", label: "Население" },
  { id: "land", label: "Территория и природа" },
  { id: "explore", label: "Разделы энциклопедии" },
];

const MOTES = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i * 0.9) % 14,
  dur: 12 + ((i * 7) % 10),
  dx: ((i % 5) - 2) * 25,
  size: 1 + (i % 3),
}));

function Index() {
  return (
    <main>
      <Hero />
      <Facts />
      <section id="regions" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
        <SectionHead num="2" kicker="География" title={<>Шесть областей <em className="text-primary not-italic">и столица</em></>} lede="Наведите на область или нажмите на город — карточка покажет главное о регионе и его центре." />
        <RegionMap />
      </section>
      <section id="people" className="scroll-mt-20 border-y border-border bg-muted/40 py-28">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead num="3" kicker="Люди" title="Девять миллионов историй" lede="Как менялась численность населения, кто живёт в стране сегодня и где." />
          <Reveal><PopulationChart /></Reveal>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Reveal delay={100}><AgeDonut /></Reveal>
            <Reveal delay={200}><UrbanRural /></Reveal>
          </div>
        </div>
      </section>
      <Land />
      <Explore />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <img src={nesvizhHero} alt="Несвижский замок" className="animate-kenburns absolute inset-0 size-full object-cover" />
      <div className="bg-hero-overlay absolute inset-0" />
      <div className="pointer-events-none absolute inset-0">
        {MOTES.map((m, i) => (
          <span key={i} className="mote" style={{ left: `${m.left}%`, bottom: "-10px", width: m.size, height: m.size, animationDuration: `${m.dur}s`, animationDelay: `${m.delay}s`, ["--dx" as string]: `${m.dx}px` }} />
        ))}
      </div>

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-5 pt-24 pb-16 text-center text-hero-ink">
        <div className="animate-rise text-xs font-medium tracking-[0.25em] text-hero-ink/75 uppercase">Рэспубліка Беларусь · Центр Европы</div>
        <h1 className="animate-rise text-shadow-hero mt-5 font-display text-7xl leading-[0.95] font-light tracking-tight sm:text-8xl md:text-[9rem]" style={{ ["--d" as string]: "150ms" }}>
          Беларусь
        </h1>
        <p className="animate-rise text-shadow-hero mt-6 max-w-lg text-lg text-hero-ink/85" style={{ ["--d" as string]: "300ms" }}>
          Синеокий край тысячи озёр, древних замков и бескрайних пущ — в самом сердце континента.
        </p>

        <ol className="animate-rise mt-12 w-full max-w-md space-y-2.5 text-sm" style={{ ["--d" as string]: "450ms" }}>
          {TOC.map((t, i) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="group flex items-center gap-3 text-hero-ink/85 transition-colors hover:text-hero-ink">
                <span className="w-8 text-left text-xs text-hero-ink/55 tabular-nums">({i + 1})</span>
                <span className="leader h-2 flex-1 text-hero-ink/35 transition-colors group-hover:text-hero-ink/70" />
                <span className="transition-transform duration-300 group-hover:-translate-x-1">{t.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
      <a href="#facts" aria-label="Листать вниз" className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-hero-ink/70">
        <ArrowDown className="size-5" />
      </a>
    </section>
  );
}

function Facts() {
  const { ref, shown } = useInView<HTMLDivElement>(0.3);
  const items = [
    { icon: MapIcon, v: 207.6, d: 1, unit: "тыс. км²", k: "Площадь — 13-е место в Европе" },
    { icon: Users, v: 9.07, d: 2, unit: "млн", k: "Жителей на 2026 год" },
    { icon: Trees, v: 40, d: 0, unit: "%", k: "Территории покрыто лесом" },
    { icon: Droplets, v: 10800, d: 0, unit: "", k: "Озёр по всей стране" },
  ];
  return (
    <section id="facts" className="mx-auto max-w-6xl scroll-mt-20 px-5 pt-16 pb-12">
      <SectionHead num="1" kicker="Коротко" title="Страна в цифрах" />
      <div ref={ref} className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
        {items.map((it, i) => (
          <div key={it.k} className="group relative overflow-hidden bg-background p-6 transition-colors duration-500 hover:bg-card md:p-8">
            <it.icon className="pointer-events-none absolute -right-4 -bottom-4 size-28 text-foreground/[0.04] transition-all duration-700 group-hover:-rotate-12 group-hover:text-primary/10" strokeWidth={1.25} />
            <span className="mb-6 grid size-11 place-items-center rounded-xl border border-border bg-card text-primary transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground">
              <it.icon className="size-5" strokeWidth={1.75} />
            </span>
            <div className="font-display text-4xl tracking-tight md:text-5xl">
              <CountUp value={it.v} decimals={it.d} start={shown} duration={1400 + i * 200} />
              <span className="ml-1.5 text-lg text-muted-foreground">{it.unit}</span>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">{it.k}</div>
            <div className="mt-5 h-px w-8 bg-primary transition-all duration-500 group-hover:w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Land() {
  const nature = [
    { icon: Waves, v: "20 800", k: "рек, крупнейшие — Днепр, Неман, Припять" },
    { icon: Droplets, v: "Нарочь", k: "самое большое озеро — 79,6 км²" },
    { icon: Mountain, v: "345 м", k: "Дзержинская гора — высшая точка" },
    { icon: Trees, v: "1409", k: "год — Беловежская пуща стала заповедной" },
  ];
  return (
    <section id="land" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
      <SectionHead num="4" kicker="Природа" title={<>Земля лесов, <em className="text-primary not-italic">озёр</em> и болот</>} lede="Равнинная страна без моря, где почти половина земли — под лесом и полями." />
      <Reveal><LandUse /></Reveal>
      <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {nature.map(({ icon: Icon, v, k }, i) => (
            <Reveal key={k} delay={150 + i * 80} className="group bg-card p-6">
              <span className="grid size-10 place-items-center rounded-full bg-muted text-primary transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                <Icon className="size-[18px]" strokeWidth={1.75} />
              </span>
              <div className="mt-5 font-display text-3xl">{v}</div>
              <div className="mt-1 text-sm text-muted-foreground">{k}</div>
            </Reveal>
          ))}
      </div>
      <div className="mt-16">
        <SectionHead num="4.1" kicker="Наследие" title="Шесть объектов ЮНЕСКО" />
        <Reveal><UnescoStrip /></Reveal>
      </div>
    </section>
  );
}

function Explore() {
  const cards = [
    { to: "/history", t: "История", s: "От Полоцка до наших дней", img: nesvizh },
    { to: "/culture", t: "Культура", s: "Язык, музыка, ремёсла", img: costume },
    { to: "/traditions", t: "Традиции", s: "Купалье, костюм, символы", img: kupalle },
  ] as const;
  return (
    <section id="explore" className="scroll-mt-20 border-t border-border bg-muted/40 py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead num="5" kicker="Дальше" title="Продолжить путешествие" />
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.to} delay={i * 120}>
              <Link to={c.to} className="group relative block aspect-[3/4] overflow-hidden rounded-2xl isolate [transform:translateZ(0)]">
                <img src={c.img} alt={c.t} className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div>
                    <div className="font-display text-3xl">{c.t}</div>
                    <div className="text-sm text-muted-foreground">{c.s}</div>
                  </div>
                  <span className="grid size-10 place-items-center rounded-full border border-border bg-background/60 transition-all duration-300 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
