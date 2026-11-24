import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flame, Pause, Play, SkipBack, SkipForward, Snowflake, Sun, Wheat, Flower2, ArrowRight, Plus } from "lucide-react";
import kupalle from "@/assets/kupalle-night.jpg";
import costume from "@/assets/folk-costume.jpg";
import costumeMale from "@/assets/folk-costume-male.jpg";
import zubr from "@/assets/zubr.jpg";
import stork from "@/assets/stork.jpg";
import cornflowers from "@/assets/cornflowers.jpg";
import kolyady from "@/assets/kolyady.jpg";
import maslenitsa from "@/assets/maslenitsa.jpg";
import dozhinki from "@/assets/dozhinki.jpg";
import { ArticleHero } from "@/components/site/article-hero";
import { Reveal, SectionHead } from "@/components/site/reveal";
import { Ornament } from "@/components/site/ornament";

export const Route = createFileRoute("/traditions")({
  head: () => ({
    meta: [
      { title: "Традиции Беларуси — символы, праздники, орнамент, строй" },
      { name: "description", content: "Флаг и герб, гимн куплет за куплетом, язык вышивки, Купалье и Коляды, зубр и бусел, народный костюм по регионам." },
      { property: "og:title", content: "Традиции Беларуси — Моя Беларусь" },
      { property: "og:description", content: "Государственные символы, народные праздники, природные знаки и традиционный строй в интерактивном лонгриде." },
      { property: "og:type", content: "article" },
    ],
  }),
  component: Traditions,
});

const TOC = [
  { id: "state", label: "Флаг, герб и гимн" },
  { id: "ornament", label: "Язык орнамента" },
  { id: "holidays", label: "Народные праздники" },
  { id: "nature", label: "Природные символы" },
  { id: "costume", label: "Традиционный строй" },
];

function Traditions() {
  return (
    <main>
      <ArticleHero kicker="Раздел 05 · Традиции" title="Традиции" lede="Красно-зелёный флаг, рушник с солнечным ромбом, купальский костёр и бусел на крыше — живая память народа." image={kupalle} toc={TOC} />
      <StateSymbols />
      <Anthem />
      <OrnamentDecoder />
      <Holidays />
      <Nature />
      <Costume />
      <section className="mx-auto max-w-6xl px-5 py-28">
        <Reveal>
          <Link to="/quiz" className="group relative isolate block overflow-hidden rounded-3xl bg-ink-dark shadow-soft [transform:translateZ(0)]">
            <img src={kupalle} alt="" className="absolute -inset-px size-[calc(100%+2px)] max-w-none object-cover [mask-image:linear-gradient(to_right,transparent,black_35%)] transition-transform duration-[1.4s] group-hover:scale-105" />
            <div className="absolute -inset-px bg-gradient-to-r from-ink-dark via-ink-dark/80 to-ink-dark/20" />
            <div className="relative flex flex-col gap-8 p-10 text-hero-ink md:flex-row md:items-end md:justify-between md:p-14">
              <div className="max-w-xl">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-hero-ink/70">Проверьте себя</div>
                <div className="mt-3 font-display text-4xl leading-tight md:text-6xl">Викторина о Беларуси</div>
                <p className="mt-4 text-hero-ink/80">Десять случайных вопросов об истории, традициях и природе — каждый раз новый набор.</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-primary px-6 py-3.5 font-medium text-primary-foreground transition-all duration-500 group-hover:gap-5 md:self-auto">
                Начать <ArrowRight className="size-5" />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>
    </main>
  );
}

const FLAG_PARTS = [
  { id: "red", n: "Красная полоса", t: "Занимает 2/3 полотна. Цвет победных знамён, солнца и мужества — напоминание о Грюнвальдской битве и о жертвах Великой Отечественной войны." },
  { id: "green", n: "Зелёная полоса", t: "Нижняя треть. Цвет надежды, весны и возрождения, лесов и полей, которые занимают почти 40% территории страны." },
  { id: "orn", n: "Орнамент у древка", t: "Красный узор на белом — «Восходящее солнце», созданный в 1917 году Матрёной Маркевич. Белый — символ духовной чистоты и свободы." },
];
const EMBLEM_PARTS = [
  { n: "Контур страны", t: "Золотой силуэт Беларуси в лучах восходящего солнца над земным шаром." },
  { n: "Колосья", t: "Венок из ржаных колосьев с цветками клевера и льна — трудолюбие и урожай." },
  { n: "Лента", t: "Красно-зелёная лента с надписью «Рэспубліка Беларусь»." },
  { n: "Звезда", t: "Пятиконечная красная звезда вверху — память о Победе." },
];

function StateSymbols() {
  const [p, setP] = useState(0);
  const [e, setE] = useState(0);
  const cur = FLAG_PARTS[p]!;
  return (
    <section id="state" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
      <SectionHead num="1" kicker="Дзяржаўныя сімвалы" title={<>Флаг, герб <em className="not-italic text-primary">и их смысл</em></>} lede="Нажмите на часть флага, чтобы узнать, что она означает. Флаг утверждён на референдуме 14 мая 1995 года." />
      <Reveal>
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="flag-stage" data-part={FLAG_PARTS[p]!.id}>
            <div className="animate-wave relative aspect-[2/1] overflow-hidden rounded-lg shadow-soft">
              <img src="/flag-belarus.svg" alt="Государственный флаг Республики Беларусь" className="absolute inset-0 size-full" draggable={false} />
              {([
                { i: 2, cls: "left-0 top-0 h-full w-[11.11%]" },
                { i: 0, cls: "left-[11.11%] top-0 h-[66.67%] right-0" },
                { i: 1, cls: "left-[11.11%] bottom-0 h-[33.33%] right-0" },
              ] as const).map(({ i, cls }) => (
                <button key={i} aria-label={FLAG_PARTS[i]!.n} onClick={() => setP(i)} onMouseEnter={() => setP(i)} onFocus={() => setP(i)} data-on={p === i} className={`flag-zone absolute ${cls}`} />
              ))}
              <div className="flag-sheen pointer-events-none absolute inset-0" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
              {FLAG_PARTS.map((x, i) => (
                <button key={x.id} onClick={() => setP(i)} onMouseEnter={() => setP(i)} className={`rounded-full border px-3 py-1.5 transition-all duration-300 ${i === p ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>{x.n}</button>
              ))}
            </div>
          </div>
          <div key={p} className="animate-in fade-in slide-in-from-right-3 duration-500">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{p + 1} / 3</div>
            <h3 className="mt-2 font-display text-4xl">{cur.n}</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{cur.t}</p>
            <div className="mt-6 flex gap-2">
              {FLAG_PARTS.map((x, i) => <button key={x.id} aria-label={x.n} onClick={() => setP(i)} className={`h-1.5 rounded-full transition-all ${i === p ? "w-10 bg-primary" : "w-4 bg-border hover:bg-muted-foreground"}`} />)}
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal className="mt-20">
        <h3 className="mb-6 font-display text-3xl">Из чего состоит герб</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EMBLEM_PARTS.map((x, i) => (
            <button key={x.n} onMouseEnter={() => setE(i)} onClick={() => setE(i)} className={`group rounded-2xl border p-6 text-left transition-all duration-500 ${i === e ? "-translate-y-1 border-primary/50 bg-card shadow-soft" : "border-border bg-card/50 hover:border-foreground/20"}`}>
              <span className={`font-display text-5xl transition-colors ${i === e ? "text-primary" : "text-muted-foreground/40"}`}>0{i + 1}</span>
              <div className="mt-3 font-display text-2xl">{x.n}</div>
              <p className="mt-2 text-sm text-muted-foreground">{x.t}</p>
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

const CHORUS = ["Слаўся, зямлі нашай светлае імя,", "Слаўся, народаў братэрскі саюз!", "Наша любімая маці-Радзіма,", "Вечна жыві і квітней, Беларусь!"];
const VERSES = [
  { n: "Куплет I", l: ["Мы, беларусы — мірныя людзі,", "Сэрцам адданыя роднай зямлі,", "Шчыра сябруем, сілы гартуем", "Мы ў працавітай, вольнай сям'і."] },
  { n: "Припев", l: CHORUS },
  { n: "Куплет II", l: ["Разам з братамі мужна вякамі", "Мы баранілі родны парог,", "У бітвах за волю, бітвах за долю", "Свой здабылі мы сцяг перамог!"] },
  { n: "Припев", l: CHORUS },
  { n: "Куплет III", l: ["Дружба народаў — сіла народаў —", "Наш запаветны, сонечны шлях.", "Горда ж узвіся ў ясныя высі,", "Сцяг пераможны — радасці сцяг!"] },
  { n: "Припев", l: CHORUS },
];
const LINE_MS = 2600;

function Anthem() {
  const [v, setV] = useState(0);
  const [line, setLine] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => {
      if (line < 3) setLine(line + 1);
      else if (v < VERSES.length - 1) { setV(v + 1); setLine(0); }
      else { setPlaying(false); }
    }, LINE_MS);
    return () => clearTimeout(id);
  }, [playing, line, v]);
  const go = (i: number) => { setV(Math.max(0, Math.min(VERSES.length - 1, i))); setLine(0); };
  const total = VERSES.length * 4;
  const done = v * 4 + line + (playing ? 1 : 0);
  return (
    <section className="scroll-mt-20 border-y border-border bg-muted/40 py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead num="2" kicker="Гімн" title={<>«Мы, беларусы» — <em className="not-italic text-primary">куплет за куплетом</em></>} lede="Музыка Нестора Соколовского написана в 1944 году. Текст Михася Климковича и Владимира Каризны в нынешней редакции утверждён 2 июля 2002 года." />
        <Reveal>
          <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-soft lg:grid-cols-[1fr_1.4fr]">
            <div className="flex flex-col justify-between gap-8 border-b border-border p-8 lg:border-r lg:border-b-0">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Сейчас</div>
                <div className="mt-2 font-display text-4xl">{VERSES[v]!.n}</div>
                <ul className="mt-6 space-y-1">
                  {VERSES.map((x, i) => (
                    <li key={i}><button onClick={() => go(i)} className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${i === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>{x.n}</button></li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="h-1 overflow-hidden rounded-full bg-border"><div className="h-full bg-primary transition-all duration-700" style={{ width: `${(done / total) * 100}%` }} /></div>
                <div className="mt-5 flex items-center justify-center gap-3">
                  <button aria-label="Назад" onClick={() => go(v - 1)} className="grid size-11 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"><SkipBack className="size-4" /></button>
                  <button aria-label={playing ? "Пауза" : "Воспроизвести"} onClick={() => { if (!playing && v === VERSES.length - 1 && line === 3) go(0); setPlaying(!playing); }} className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105">{playing ? <Pause className="size-5" /> : <Play className="size-5 translate-x-0.5" />}</button>
                  <button aria-label="Вперёд" onClick={() => go(v + 1)} className="grid size-11 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"><SkipForward className="size-4" /></button>
                </div>
              </div>
            </div>
            <div key={v} className="flex animate-in fade-in flex-col justify-center gap-3 p-8 duration-500 md:p-12">
              {VERSES[v]!.l.map((t, i) => (
                <p key={i} onClick={() => setLine(i)} className={`cursor-pointer font-display text-2xl leading-snug transition-all duration-500 md:text-3xl ${i === line ? "translate-x-2 text-foreground" : "text-muted-foreground/50 hover:text-muted-foreground"}`}>{t}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const GLYPHS = [
  { n: "Солнце", t: "Ромб с крестом внутри — Ярило, источник тепла и жизни. Вышивали на свадебных рушниках, чтобы семья была светлой.", d: "M50 10 90 50 50 90 10 50Z M50 30 V70 M30 50 H70" },
  { n: "Жизнь", t: "Дерево с ветвями-ёлочкой — родовое древо, связь предков и потомков. Корни внизу, побеги вверх.", d: "M50 90 V15 M50 30 L35 20 M50 30 L65 20 M50 48 L30 36 M50 48 L70 36 M50 66 L25 52 M50 66 L75 52" },
  { n: "Мать", t: "Ромб с поднятыми «руками» — Берегиня, хранительница рода и дома. Самый сильный женский оберег.", d: "M50 35 70 55 50 75 30 55Z M50 35 V15 M30 55 L15 35 M70 55 L85 35 M45 15 H55" },
  { n: "Земля", t: "Ромб, разделённый на четыре поля, — засеянная пашня. Точки внутри — посеянные зёрна.", d: "M50 10 90 50 50 90 10 50Z M30 30 70 70 M70 30 30 70" },
  { n: "Весна", t: "Ромб с крючками-побегами по углам — пробуждение природы. Вышивали на одежде девушек к Гуканью весны.", d: "M50 25 75 50 50 75 25 50Z M50 25 L50 10 L60 10 M75 50 L90 50 L90 60 M50 75 L50 90 L40 90 M25 50 L10 50 L10 40" },
  { n: "Урожай", t: "Колос из ромбов-зёрен — достаток и сытая зима. Его ткали на поясах и скатертях к Дожинкам.", d: "M50 90 V30 M50 20 58 28 50 36 42 28Z M50 40 58 48 50 56 42 48Z M50 60 58 68 50 76 42 68Z M42 28 30 22 M58 28 70 22" },
];

function OrnamentDecoder() {
  const [g, setG] = useState(0);
  const cur = GLYPHS[g]!;
  return (
    <section id="ornament" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
      <SectionHead num="3" kicker="Арнамент" title={<>Вышивка — <em className="not-italic text-primary">письмо без букв</em></>} lede="Каждый узор на рушнике что-то означает. Выберите знак, чтобы прочитать его." />
      <Reveal>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="grid grid-cols-3 gap-3">
            {GLYPHS.map((x, i) => (
              <button key={x.n} onClick={() => setG(i)} onMouseEnter={() => setG(i)} className={`group flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border transition-all duration-300 ${i === g ? "border-primary bg-primary text-primary-foreground shadow-soft" : "border-border bg-card text-primary hover:-translate-y-1 hover:border-primary/40"}`}>
                <svg viewBox="0 0 100 100" className="size-12 transition-transform duration-500 group-hover:rotate-45"><path d={x.d} fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="miter" /></svg>
                <span className="text-xs font-semibold uppercase tracking-[0.14em]">{x.n}</span>
              </button>
            ))}
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-10">
            <svg key={g} viewBox="0 0 100 100" className="animate-glyph absolute -right-8 -bottom-8 size-64 text-primary/10"><path d={cur.d} fill="none" stroke="currentColor" strokeWidth="5" /></svg>
            <div key={`t${g}`} className="relative animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Знак</div>
              <h3 className="mt-2 font-display text-5xl">{cur.n}</h3>
              <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted-foreground">{cur.t}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const HOLIDAYS = [
  { n: "Коляды", d: "25 декабря — 6 января", s: "Зима", icon: Snowflake, img: kolyady, t: "Святки между Рождеством и Крещением. Колядовщики ходят с «звездой» и козой, поют пожелания хозяевам. Главное зрелище — батлейка: кукольный вертеп в двухъярусном ящике, где наверху разыгрывают Рождество, а внизу — смешные сцены с царём Иродом." , f: ["Кутья на Святой вечер", "Ряженые «Коза» и «Дед»", "Батлейка — народный театр"] },
  { n: "Масленица и Гуканье весны", d: "Март — апрель", s: "Весна", icon: Flower2, img: maslenitsa, t: "Неделю пекут блины и провожают зиму, сжигая чучело. Позже девушки поднимаются на пригорки и крыши и «гукают» — зовут весну песнями-веснянками, печут из теста птичек-«жаворонков»." , f: ["Блины и катание с горок", "Веснянки на пригорках", "Печенье «жаворонки»"] },
  { n: "Купалье", d: "Ночь на 7 июля", s: "Лето", icon: Flame, img: kupalle, t: "Самая короткая ночь года. Прыгают через костёр, пускают венки по воде — куда поплывёт, оттуда и жених. До рассвета ищут цветок папоротника, который якобы дарит счастье и умение понимать язык зверей.", f: ["Прыжки через костёр", "Венки на воде", "Поиски цвета папоротника"] },
  { n: "Дожинки", d: "Конец августа — сентябрь", s: "Осень", icon: Wheat, img: dozhinki, t: "Праздник последнего снопа. Последние колосья оставляют на поле — «бороду» для духа урожая, а из сжатого делают нарядный «дожиночный сноп» и несут его хозяину с песнями. Сегодня это и общегосударственный фестиваль «Дажынкі».", f: ["Последний сноп и «борода»", "Венок из колосьев жнее", "Общий стол всей деревни"] },
];

function Holidays() {
  const [h, setH] = useState(2);
  const cur = HOLIDAYS[h]!;
  return (
    <section id="holidays" className="scroll-mt-20 border-y border-border bg-muted/40 py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead num="4" kicker="Святы" title={<>Год по <em className="not-italic text-primary">народному календарю</em></>} lede="Крестьянский год делился на четыре праздничных круга. Выберите время года." />
        <Reveal>
          <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl border border-border bg-card p-2 md:grid-cols-4">
            {HOLIDAYS.map((x, i) => {
              const I = x.icon;
              return (
                <button key={x.n} onClick={() => setH(i)} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-300 ${i === h ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                  <I className="size-5 shrink-0" strokeWidth={1.75} />
                  <span><span className="block text-[11px] uppercase tracking-[0.16em] opacity-70">{x.s}</span><span className="block text-sm font-semibold leading-tight">{x.n}</span></span>
                </button>
              );
            })}
          </div>
          <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-soft lg:grid-cols-[1.2fr_1fr]">
            <div className="relative min-h-[380px] overflow-hidden">
              {HOLIDAYS.map((x, i) => <img key={x.n} src={x.img} alt={x.n} loading="lazy" className={`absolute inset-0 size-full object-cover transition-all duration-1000 ${i === h ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} />)}
              <div className="absolute bottom-4 left-4 rounded-full glass px-4 py-1.5 text-sm">{cur.d}</div>
            </div>
            <div key={h} className="animate-in fade-in slide-in-from-right-3 p-8 duration-500 md:p-10">
              <h3 className="font-display text-4xl">{cur.n}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{cur.t}</p>
              <ul className="mt-6 space-y-2.5">
                {cur.f.map((f) => <li key={f} className="flex items-center gap-3 text-sm"><Sun className="size-4 text-primary" />{f}</li>)}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const NATURE = [
  { n: "Зубр", by: "Зубр", img: zubr, k: "до 1 000 кг", t: "Исполин Беловежской пущи и крупнейшее животное Европы. В 1919 году зубры исчезли в дикой природе — сегодня в Беларуси их больше 2 500, это одна из крупнейших популяций в мире." },
  { n: "Белый аист", by: "Бусел", img: stork, k: "~20 000 пар", t: "Бусел, свивший гнездо на крыше, приносит в дом мир, достаток и детей. Разорить гнездо — большой грех. В Беларуси одна из самых высоких плотностей аистов в Европе." },
  { n: "Василёк и лён", by: "Васілёк і лён", img: cornflowers, k: "«синие глаза»", t: "Василёк во ржи — символ верности и родного поля, а голубые цветы льна сравнивают с глазами белорусских девушек. Цветок льна есть даже на гербе страны." },
];

function Nature() {
  return (
    <section id="nature" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
      <SectionHead num="5" kicker="Прырода" title={<>Знаки <em className="not-italic text-primary">родной земли</em></>} lede="Наведите на карточку — откроется история." />
      <div className="grid gap-5 md:grid-cols-3">
        {NATURE.map((x, i) => (
          <Reveal key={x.n} delay={i * 100}>
            <div tabIndex={0} className="group relative h-[460px] overflow-hidden rounded-2xl shadow-soft outline-none isolate [transform:translateZ(0)]">
              <img src={x.img} alt={x.n} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-ink-dark via-ink-dark/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-hero-ink">
                <div className="text-[11px] uppercase tracking-[0.18em] text-hero-ink/70">{x.by} · {x.k}</div>
                <div className="mt-1 font-display text-4xl">{x.n}</div>
                <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr] group-focus:grid-rows-[1fr]">
                  <p className="overflow-hidden pt-3 text-sm leading-relaxed text-hero-ink/85">{x.t}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const PARTS = {
  female: [
    { n: "Намітка", x: 52, y: 5, t: "Длинное белое полотенце-убор замужней женщины, обёрнутое вокруг головы. Девушки носили венки и ленты." },
    { n: "Кашуля", x: 31, y: 30, t: "Льняная рубаха с вышитыми плечевыми вставками. Самый богатый узор — на рукавах: он защищал руки-работницы." },
    { n: "Пояс", x: 56, y: 37, t: "Тканый пояс с кистями туго обвивал талию. Его узор и цвет говорили о родной деревне, а сам пояс считался оберегом." },
    { n: "Фартух", x: 50, y: 74, t: "Передник с поперечными полосами вышивки и кружевом — главное украшение праздничного наряда." },
    { n: "Спадніца", x: 28, y: 78, t: "Юбка: андарак в клетку или полоску, саян из шерсти. По цвету клетки узнавали деревню." },
  ],
  male: [
    { n: "Магерка", x: 49, y: 7, t: "Войлочная шляпа с округлым верхом и отворотом — самый узнаваемый мужской убор." },
    { n: "Кашуля", x: 40, y: 32, t: "Белая рубаха навыпуск с вышитым воротом-стойкой, планкой и манжетами." },
    { n: "Пояс", x: 56, y: 40, t: "Тканый шерстяной пояс с кистями. Без пояса выходить на люди было неприлично — он оберегал." },
    { n: "Ногавіцы", x: 43, y: 68, t: "Льняные штаны в полоску, заправленные в онучи." },
    { n: "Лапці", x: 39, y: 91, t: "Лапти из лыка — повседневная обувь. На праздник надевали кожаные «постолы» или сапоги." },
  ],
};
const REGIONS = [
  { n: "Поозерье", t: "Север: белая гамма, сдержанная красная вышивка, геометрия." },
  { n: "Поднепровье", t: "Восток: красные клетчатые андараки, богатые фартухи." },
  { n: "Центр", t: "Минщина: тканые узоры, яркие гарсэты, «слуцкий» блеск поясов." },
  { n: "Понеманье", t: "Запад: светлые ткани, браное ткачество, белые свиты." },
  { n: "Полесье", t: "Юг: архаичные красные узоры, сложные головные уборы, наметки." },
];

function Costume() {
  const [sex, setSex] = useState<"female" | "male">("female");
  const [a, setA] = useState(0);
  const [r, setR] = useState(0);
  const parts = PARTS[sex];
  const cur = parts[a] ?? parts[0]!;
  return (
    <section id="costume" className="scroll-mt-20 border-y border-border bg-muted/40 py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead num="6" kicker="Строй" title={<>Анатомия <em className="not-italic text-primary">народного костюма</em></>} lede="Нажмите на светящуюся точку, чтобы узнать название детали. Строй рассказывал о возрасте, семье и родной деревне хозяина." />
        <Reveal>
          <div className="mb-6 inline-flex rounded-full border border-border bg-card p-1">
            {(["female", "male"] as const).map((s) => (
              <button key={s} onClick={() => { setSex(s); setA(0); }} className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${sex === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{s === "female" ? "Женский строй" : "Мужской строй"}</button>
            ))}
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-soft isolate [transform:translateZ(0)]">
              <img key={sex} src={sex === "female" ? costume : costumeMale} alt={sex === "female" ? "Женский белорусский строй" : "Мужской белорусский строй"} className="absolute inset-0 size-full animate-in fade-in object-cover duration-500" />
              {parts.map((p, i) => (
                <button key={sex + p.n} aria-label={p.n} onClick={() => setA(i)} onMouseEnter={() => setA(i)} className="group absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                  <span className={`absolute inset-0 animate-ping rounded-full bg-primary/60 ${i === a ? "" : "hidden"}`} />
                  <span className={`relative grid size-8 place-items-center rounded-full border-2 border-hero-ink text-xs font-bold transition-all ${i === a ? "scale-110 bg-primary text-primary-foreground" : "bg-ink-dark/50 text-hero-ink group-hover:bg-primary"}`}>{i + 1}</span>
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-6">
              <div key={sex + a} className="animate-in fade-in slide-in-from-bottom-2 rounded-2xl border border-border bg-card p-8 duration-500">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Деталь {a + 1}</div>
                <h3 className="mt-2 font-display text-4xl">{cur.n}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{cur.t}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card">
                <div className="border-b border-border px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Строй по регионам</div>
                {REGIONS.map((x, i) => (
                  <button key={x.n} onClick={() => setR(i)} className={`block w-full border-b border-border px-6 py-4 text-left last:border-0 transition-colors ${i === r ? "bg-muted" : "hover:bg-muted/50"}`}>
                    <div className="flex items-center"><span className="font-display text-xl">{x.n}</span><Plus className={`ml-auto size-4 transition-transform duration-300 ${i === r ? "rotate-45 text-primary" : "text-muted-foreground"}`} /></div>
                    <div className={`grid transition-all duration-500 ${i === r ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><p className="overflow-hidden text-sm text-muted-foreground">{x.t}</p></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
        <Ornament className="mt-20 h-6 w-full text-primary/50" />
      </div>
    </section>
  );
}
