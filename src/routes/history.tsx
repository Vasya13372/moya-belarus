import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import nesvizh from "@/assets/nesvizh-castle-hero.jpg";
import mir from "@/assets/mir-castle.jpg";
import minsk from "@/assets/minsk-skyline.jpg";
import flight from "@/assets/castle-flight.mp4";
import flightPoster from "@/assets/castle-flight-poster.jpg";
import eraPolotsk from "@/assets/era-polotsk.jpg";
import eraXix from "@/assets/era-xix.jpg";
import eraXx from "@/assets/era-xx.jpg";
import { ChronicleAtlas, VideoPrologue, YearRail } from "@/components/site/history-parts";
import { Reveal, SectionHead } from "@/components/site/reveal";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "История Беларуси — от Полоцка до наших дней" },
      { name: "description", content: "Тысяча лет истории Беларуси: Полоцкое княжество, ВКЛ, Речь Посполитая, возрождение, XX век и современность." },
      { property: "og:title", content: "История Беларуси — Моя Беларусь" },
      { property: "og:description", content: "Краткий путь сквозь эпохи и подробная летопись белорусской земли." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: History,
});

const ERAS = [
  { id: "polotsk", from: 862, to: 1250, places: [{ name: "Полоцк", lon: 28.8, lat: 55.49 }, { name: "Туров", lon: 27.74, lat: 52.07 }, { name: "Витебск", lon: 30.2, lat: 55.19 }], years: "862 – XIII в.", name: "Полоцкое княжество", short: "Первое государство на белорусских землях", img: eraPolotsk,
    text: [
      "Полоцк впервые упомянут в летописи под 862 годом — это старейший город Беларуси. Здесь правила династия Рогволодовичей, а княжество спорило за влияние с Киевом и Новгородом.",
      "Князь Всеслав Чародей в XI веке сделал Полоцк одним из сильнейших центров Руси, а Софийский собор стал символом его независимости.",
      "Евфросиния Полоцкая основала монастыри, школы и мастерские. Крест Евфросинии работы мастера Лазаря Богши (1161) — святыня белорусского народа.",
    ], facts: ["862 — первое упоминание Полоцка", "1044–1066 — Софийский собор", "1161 — Крест Евфросинии"] },
  { id: "vkl", from: 1250, to: 1569, places: [{ name: "Новогрудок", lon: 25.82, lat: 53.6 }, { name: "Мир", lon: 26.47, lat: 53.45 }, { name: "Лида", lon: 25.3, lat: 53.89 }, { name: "Гродно", lon: 23.83, lat: 53.68 }], years: "XIII – 1569", name: "Великое княжество Литовское", short: "Держава от Балтики до Чёрного моря", img: mir,
    text: [
      "В середине XIII века возникло Великое княжество Литовское. Старобелорусский язык стал языком канцелярии, законов и летописей.",
      "В 1410 году под Грюнвальдом войска ВКЛ и Польши разбили Тевтонский орден. В 1517 году Франциск Скорина из Полоцка издал в Праге «Псалтирь» — начало белорусского книгопечатания.",
      "Строились замки: Мир, Новогрудок, Лида. Статуты ВКЛ 1529, 1566 и 1588 годов стали одними из самых передовых сводов законов Европы.",
    ], facts: ["1410 — Грюнвальдская битва", "1517 — «Псалтирь» Скорины", "1588 — Статут Льва Сапеги"] },
  { id: "rp", from: 1569, to: 1795, places: [{ name: "Несвиж", lon: 26.68, lat: 53.22 }, { name: "Слуцк", lon: 27.56, lat: 53.03 }, { name: "Гродно", lon: 23.83, lat: 53.68 }], years: "1569 – 1795", name: "Речь Посполитая", short: "Магнаты, барокко и слуцкие пояса", img: nesvizh,
    text: [
      "Люблинская уния 1569 года объединила ВКЛ и Польшу в Речь Посполитую. Княжество сохранило своё войско, казну и законы.",
      "Это эпоха магнатов Радзивиллов и Сапег: расцвели Несвиж, Слуцк, Гродно. Виленское барокко подарило костёлы и дворцы, а в Слуцке ткали знаменитые пояса.",
      "Войны XVII века опустошили край, а три раздела 1772–1795 годов включили белорусские земли в Российскую империю.",
    ], facts: ["1569 — Люблинская уния", "1583 — Несвижский замок", "1795 — третий раздел"] },
  { id: "xix", from: 1795, to: 1918, places: [{ name: "Полоцк", lon: 28.80, lat: 55.49 }, { name: "Минск", lon: 27.56, lat: 53.9 }, { name: "Свислочь", lon: 24.1, lat: 53.03 }], years: "1795 – 1917", name: "Национальное возрождение", short: "Восстания, слово и самосознание", img: eraXix,
    text: [
      "В XIX веке белорусские земли вошли в Северо-Западный край империи. Восстания 1830 и 1863 годов стремились вернуть свободу.",
      "Кастусь Калиновский издавал «Мужицкую праўду» — первую газету на белорусском языке. Франтишек Богушевич призывал: «Не пакідайце ж мовы нашай беларускай, каб не ўмёрлі».",
      "В начале XX века газета «Наша ніва» объединила Янку Купалу, Якуба Коласа и Максима Богдановича — родилась новая белорусская литература.",
    ], facts: ["1863 — восстание Калиновского", "1906 — «Наша ніва»", "1913 — «Вянок» Богдановича"] },
  { id: "xx", from: 1918, to: 1991, places: [{ name: "Брест", lon: 23.69, lat: 52.1 }, { name: "Хатынь", lon: 27.95, lat: 54.33 }, { name: "Минск", lon: 27.56, lat: 53.9 }], years: "1918 – 1991", name: "XX век: испытания и подвиг", short: "БНР, БССР, война и возрождение", img: eraXx,
    text: [
      "25 марта 1918 года провозглашена Белорусская Народная Республика, а 1 января 1919 — Советская Белоруссия. В 1922 году БССР вошла в состав СССР.",
      "Великая Отечественная война стала самой страшной страницей: погиб каждый третий житель. Брестская крепость, Хатынь и партизанское движение стали символами стойкости.",
      "После войны Минск был отстроен заново, республика превратилась в индустриальный центр — тракторы МТЗ, БелАЗы, наука и образование.",
    ], facts: ["1918 — БНР", "1941 — оборона Брестской крепости", "1944 — освобождение Минска"] },
  { id: "today", from: 1991, to: 2026, places: [{ name: "Минск", lon: 27.56, lat: 53.9 }, { name: "Беловежская пуща", lon: 23.85, lat: 52.7 }, { name: "Мир", lon: 26.47, lat: 53.45 }], years: "1991 – наши дни", name: "Современная Беларусь", short: "Независимая страна в сердце Европы", img: minsk,
    text: [
      "25 августа 1991 года Беларусь провозгласила независимость, а в 1994 году приняла Конституцию.",
      "Сегодня страна бережёт своё наследие: Мирский замок, Несвиж, Беловежская пуща и дуга Струве входят в список ЮНЕСКО.",
      "Минск стал современным мегаполисом с Национальной библиотекой-«алмазом», а на дорогах мира ездят белорусские БелАЗы.",
    ], facts: ["1991 — независимость", "1994 — Конституция", "4 объекта ЮНЕСКО"] },
];

function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / total));
      setProgress(p);
      setActive(Math.min(ERAS.length - 1, Math.floor(p * ERAS.length)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section id="story" ref={ref} style={{ height: `${ERAS.length * 90}vh` }} className="relative">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {ERAS.map((e, i) => (
          <img key={e.id} src={e.img} alt="" className="absolute inset-0 size-full object-cover transition-all duration-1000"
            style={{ opacity: i === active ? 1 : 0, transform: `scale(${i === active ? 1.05 : 1.15})` }} />
        ))}
        <div className="bg-hero-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-20 text-hero-ink">
          <div className="text-xs uppercase tracking-[0.25em] text-hero-ink/70">Эпоха {active + 1} из {ERAS.length}</div>
          {ERAS.map((e, i) => i === active && (
            <div key={e.id} className="animate-rise">
              <div className="mt-3 font-display text-2xl text-hero-ink/80">{e.years}</div>
              <h2 className="text-shadow-hero mt-2 font-display text-5xl font-light leading-none md:text-7xl">{e.name}</h2>
              <p className="text-shadow-hero mt-4 max-w-xl text-lg text-hero-ink/85">{e.short}</p>
            </div>
          ))}
          <div className="mt-10 flex gap-2">
            {ERAS.map((e, i) => (
              <a key={e.id} href={`#${e.id}`} className="group flex-1">
                <div className="h-0.5 overflow-hidden bg-hero-ink/25">
                  <div className="h-full bg-hero-ink transition-[width] duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, (progress * ERAS.length - i) * 100))}%` }} />
                </div>
                <div className={`mt-2 hidden text-xs md:block ${i === active ? "text-hero-ink" : "text-hero-ink/50"}`}>{e.name}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function History() {
  return (
    <>
      <VideoPrologue video={flight} poster={flightPoster} eras={ERAS} />
      <ScrollStory />
      <section id="atlas" className="mx-auto max-w-6xl px-5 pt-24">
        <SectionHead num="01" kicker="Атлас эпох" title="Тысяча лет на одной ленте" lede="Шесть эпох — от Полоцка до наших дней. Выберите эпоху, чтобы увидеть на карте, где вершилась история." />
        <ChronicleAtlas eras={ERAS} descr={Object.fromEntries(ERAS.map((e) => [e.id, e.short]))} />
      </section>
      <section id="chronicle" className="mx-auto max-w-6xl px-5 py-24">
        <SectionHead num="02" kicker="Летопись" title="Подробно об эпохах" lede="Главные события, люди и памятники каждой эпохи." />
        <div className="space-y-24">
          {ERAS.map((e, i) => (
            <article id={e.id} key={e.id} className="scroll-mt-24 grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-start">
              <Reveal className={i % 2 ? "md:order-2" : ""}>
                <img src={e.img} alt={e.name} loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover" />
              </Reveal>
              <Reveal delay={120}>
                <div className="font-display text-sm text-muted-foreground">({String(i + 1).padStart(2, "0")}) · {e.years}</div>
                <h3 className="mt-3 font-display text-4xl leading-tight md:text-5xl">{e.name}</h3>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
                  {e.text.map((p) => <p key={p}>{p}</p>)}
                </div>
                <YearRail facts={e.facts} />
              </Reveal>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
