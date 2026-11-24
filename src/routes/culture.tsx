import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, ChefHat, Music2, Scissors, Languages, Plus } from "lucide-react";
import costume from "@/assets/folk-costume.jpg";
import straw from "@/assets/straw-craft.jpg";
import kupalle from "@/assets/kupalle-night.jpg";
import weaving from "@/assets/weaving.jpg";
import slutsk from "@/assets/slutsk.jpg";
import vytinanka from "@/assets/vytinanka.jpg";
import minsk from "@/assets/minsk-skyline.jpg";
import { ArticleHero } from "@/components/site/article-hero";
import { Reveal, SectionHead } from "@/components/site/reveal";
import { Ornament } from "@/components/site/ornament";

export const Route = createFileRoute("/culture")({
  head: () => ({
    meta: [
      { title: "Культура Беларуси — язык, литература, музыка, ремёсла, кухня" },
      { name: "description", content: "Белорусский язык, Скорина и Купала, «Песняры» и «Славянский базар», саломка, слуцкие пояса и драники." },
      { property: "og:title", content: "Культура Беларуси — Моя Беларусь" },
      { property: "og:description", content: "Язык, литература, музыка, ремёсла и кухня Беларуси в интерактивном формате." },
    ],
  }),
  component: Culture,
});

const TOC = [
  { id: "language", label: "Язык" },
  { id: "literature", label: "Литература" },
  { id: "music", label: "Музыка и фестивали" },
  { id: "crafts", label: "Ремёсла" },
  { id: "cuisine", label: "Кухня" },
];

const WORDS = [
  ["Дзякуй", "Спасибо"], ["Калі ласка", "Пожалуйста"], ["Добры дзень", "Добрый день"], ["Радзіма", "Родина"],
  ["Вясёлка", "Радуга"], ["Філіжанка", "Чашка"], ["Абдымкі", "Объятия"], ["Цмок", "Дракон"],
  ["Шчасце", "Счастье"], ["Каханне", "Любовь"], ["Парасон", "Зонт"], ["Мроя", "Мечта"],
];

const AUTHORS = [
  { y: "1517", n: "Франциск Скорина", r: "Первопечатник", t: "В Праге издал «Псалтирь» — первую печатную книгу на старобелорусском языке, раньше, чем книгопечатание пришло в Москву." },
  { y: "1588", n: "Статут ВКЛ", r: "Свод законов", t: "Третий Статут Великого княжества Литовского — один из самых совершенных правовых кодексов Европы своего времени, написан на старобелорусском." },
  { y: "1882", n: "Янка Купала", r: "Народный поэт", t: "Автор «А хто там ідзе?» — стихотворения, ставшего своего рода гимном белорусского возрождения. Переведено на 80+ языков." },
  { y: "1882", n: "Якуб Колас", r: "Народный поэт", t: "Поэма «Новая зямля» — энциклопедия белорусской деревенской жизни. Колас и Купала родились в один год." },
  { y: "1891", n: "Максим Богданович", r: "Поэт", t: "Прожил всего 25 лет, но оставил «Вянок» — единственный прижизненный сборник и вершину белорусской лирики." },
  { y: "1924", n: "Василь Быков", r: "Прозаик", t: "Писал о войне без пафоса — о выборе человека. «Сотников», «Знак беды», «Обелиск»." },
  { y: "2015", n: "Светлана Алексиевич", r: "Нобелевская премия", t: "Первый нобелевский лауреат по литературе из Беларуси — «за многоголосное творчество, памятник страданию и мужеству»." },
];

const MUSIC = [
  { n: "«Славянский базар»", m: "Витебск · с 1992", t: "Международный фестиваль искусств в летнем амфитеатре на 5000 мест." },
  { n: "«Песняры»", m: "ВИА · с 1969", t: "Легендарный ансамбль Владимира Мулявина: «Беловежская пуща», «Касіў Ясь канюшыну»." },
  { n: "Цимбалы и дуда", m: "Народные инструменты", t: "Цимбалы — главный инструмент белорусской музыки, дуда — волынка с мехом из козьей шкуры." },
  { n: "Купальский фэст", m: "Александрия · июль", t: "Самый массовый народный праздник на родине Купалья — костры, венки и песни до рассвета." },
];

const CRAFTS = [
  { n: "Саломка", t: "Плетение из соломы — визитная карточка Беларуси, внесено в список нематериального наследия. Из стеблей ржи делают кукол, коней, птиц и «павуки» — подвесные обереги.", img: straw },
  { n: "Ткачество и вышивка", t: "Красно-белый орнамент на льне — язык символов: ромб означает поле и плодородие, ёлочка — дерево жизни, крест — солнце. Рушник сопровождал человека всю жизнь.", img: weaving },
  { n: "Слуцкие пояса", t: "Шёлковые пояса с золотой нитью XVIII века ткали на мануфактуре Радзивиллов в Слуцке. Пояс носили так, чтобы был виден нужный цвет — для праздника или траура.", img: slutsk },
  { n: "Вытинанка", t: "Вырезание узоров из бумаги: симметричные деревья жизни, птицы и звёзды. Ими украшали окна и печи к праздникам.", img: vytinanka },
];

const FOOD = [
  { n: "Драники", e: "🥔", t: "Тёртый картофель, жаренный до хруста. Подают со сметаной или в «бабке» с мясом." },
  { n: "Мачанка", e: "🍲", t: "Густой соус из свинины и колбасы, в который макают блины." },
  { n: "Колдуны", e: "🥟", t: "Картофельные «пирожки» с мясной начинкой." },
  { n: "Халодник", e: "🥣", t: "Холодный свекольный суп на кефире — спасение в летнюю жару." },
  { n: "Кулага", e: "🫐", t: "Сладкое блюдо из лесных ягод и муки — старинный десерт." },
  { n: "Крамбамбуля", e: "🍯", t: "Медовая настойка со специями — напиток шляхты." },
];

function Culture() {
  return (
    <main>
      <ArticleHero kicker="Раздел 03 · Культура" title="Культура" lede="Язык, на котором печатал Скорина, песни «Песняров», соломенные кони и драники — всё, из чего складывается белорусское." image={costume} toc={TOC} />
      <Language />
      <Literature />
      <Music />
      <Crafts />
      <Cuisine />
    </main>
  );
}

function Language() {
  const [flipped, setFlipped] = useState<number | null>(null);
  return (
    <section id="language" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
      <SectionHead num="1" kicker="Мова" title={<>Два языка, <em className="not-italic text-primary">одна страна</em></>} lede="Белорусский и русский — государственные языки. Белорусский мелодичен: «ў», мягкое «дзь» и «ць». Наведите или нажмите на карточку." />
      <div className="mb-8 flex items-center gap-3 text-sm text-muted-foreground"><Languages className="size-4 text-primary" /> Слова, которые любят даже те, кто не говорит по-белорусски</div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {WORDS.map(([by, ru], i) => (
          <Reveal key={by} delay={i * 40}>
            <button className="flip block h-32 w-full text-left" data-flipped={flipped === i} onClick={() => setFlipped(flipped === i ? null : i)}>
              <div className="flip-inner relative size-full">
                <div className="flip-face absolute inset-0 flex flex-col justify-between rounded-2xl border border-border bg-card p-5">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">па-беларуску</span>
                  <span className="font-display text-2xl">{by}</span>
                </div>
                <div className="flip-face flip-back absolute inset-0 flex flex-col justify-between rounded-2xl bg-primary p-5 text-primary-foreground">
                  <span className="text-[11px] uppercase tracking-[0.18em] opacity-75">по-русски</span>
                  <span className="font-display text-2xl">{ru}</span>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Literature() {
  const [a, setA] = useState(0);
  const cur = AUTHORS[a]!;
  return (
    <section id="literature" className="scroll-mt-20 border-y border-border bg-muted/40 py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead num="2" kicker="Літаратура" title="Пять веков слова" lede="От первой печатной книги до Нобелевской премии. Выберите точку на шкале." />
        <Reveal>
          <div className="relative">
            <div className="absolute inset-x-0 top-[22px] h-px bg-border" />
            <div className="absolute top-[22px] left-0 h-px bg-primary transition-all duration-700" style={{ width: `${(a / (AUTHORS.length - 1)) * 100}%` }} />
            <div className="relative flex justify-between">
              {AUTHORS.map((x, i) => (
                <button key={x.n} onClick={() => setA(i)} onMouseEnter={() => setA(i)} className="group flex flex-col items-center gap-3">
                  <span className={`grid size-11 place-items-center rounded-full border-2 transition-all duration-300 ${i === a ? "scale-110 border-primary bg-primary text-primary-foreground" : i < a ? "border-primary bg-card text-primary" : "border-border bg-card text-muted-foreground group-hover:border-foreground/40"}`}>
                    <BookOpen className="size-4" strokeWidth={1.75} />
                  </span>
                  <span className={`text-xs tabular-nums transition-colors ${i === a ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{x.y}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <div key={a} className="mt-12 grid animate-in fade-in slide-in-from-bottom-3 items-end gap-8 duration-500 md:grid-cols-[1fr_1.3fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{cur.r}</div>
            <h3 className="mt-2 font-display text-5xl tracking-tight md:text-6xl">{cur.n}</h3>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">{cur.t}</p>
        </div>
      </div>
    </section>
  );
}

function Music() {
  return (
    <section id="music" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
      <SectionHead num="3" kicker="Музыка" title="Песни, которые поют все" />
      <div className="grid gap-4 md:grid-cols-2">
        {MUSIC.map((m, i) => (
          <Reveal key={m.n} delay={i * 80}>
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft">
              <div className="absolute -top-16 -right-16 size-40 rounded-full bg-primary/0 blur-2xl transition-all duration-700 group-hover:bg-primary/20" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">{m.m}</div>
                  <div className="mt-1 font-display text-3xl">{m.n}</div>
                </div>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border text-primary transition-all duration-500 group-hover:rotate-12 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Music2 className="size-4" />
                </span>
              </div>
              <p className="mt-4 text-muted-foreground">{m.t}</p>
              <div className="mt-6 flex h-6 items-end gap-1">
                {Array.from({ length: 28 }, (_, k) => (
                  <span key={k} className="w-1 rounded-full bg-primary/30 transition-all duration-500 group-hover:bg-primary" style={{ height: `${20 + ((k * 37 + i * 13) % 80)}%`, transitionDelay: `${k * 15}ms` }} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Crafts() {
  const [c, setC] = useState(0);
  return (
    <section id="crafts" className="scroll-mt-20 border-y border-border bg-muted/40 py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead num="4" kicker="Рамёствы" title="Сделано руками" />
        <Reveal>
          <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-soft lg:grid-cols-[1.2fr_1fr]">
            <div className="relative min-h-[360px] overflow-hidden">
              {CRAFTS.map((x, i) => (
                <img key={x.n} src={x.img} alt={x.n} loading="lazy" className={`absolute inset-0 size-full object-cover transition-all duration-1000 ${i === c ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} />
              ))}
            </div>
            <div className="flex flex-col">
              {CRAFTS.map((x, i) => (
                <button key={x.n} onClick={() => setC(i)} onMouseEnter={() => setC(i)} className={`border-b border-border p-6 text-left transition-colors last:border-0 ${i === c ? "bg-muted" : "hover:bg-muted/50"}`}>
                  <div className="flex items-center gap-3">
                    <Scissors className={`size-4 transition-colors ${i === c ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="font-display text-2xl">{x.n}</span>
                    <Plus className={`ml-auto size-4 transition-transform duration-300 ${i === c ? "rotate-45 text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className={`grid transition-all duration-500 ${i === c ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <p className="overflow-hidden text-sm leading-relaxed text-muted-foreground">{x.t}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Cuisine() {
  return (
    <section id="cuisine" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-28">
      <SectionHead num="5" kicker="Кухня" title={<>Бульба <em className="not-italic text-primary">и не только</em></>} lede="Говорят, у белорусов больше 300 блюд из картофеля. Наведите на блюдо." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FOOD.map((f, i) => (
          <Reveal key={f.n} delay={i * 60}>
            <div className="group relative h-48 overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors duration-500 hover:border-primary/40">
              <span className="absolute -right-2 -bottom-6 text-[7rem] leading-none opacity-20 grayscale transition-all duration-700 group-hover:-rotate-12 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0">{f.e}</span>
              <ChefHat className="size-5 text-primary" strokeWidth={1.75} />
              <div className="mt-4 font-display text-3xl">{f.n}</div>
              <p className="mt-2 max-w-[80%] translate-y-3 text-sm text-muted-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{f.t}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Ornament className="mt-20 h-6 w-full text-primary/50" />
    </section>
  );
}
