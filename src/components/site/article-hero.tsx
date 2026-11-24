import { ArrowDown } from "lucide-react";

export function ArticleHero({ kicker, title, lede, image, video, toc }: { kicker: string; title: string; lede: string; image: string; video?: string; toc: { id: string; label: string }[] }) {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {video ? (
        <video src={video} poster={image} autoPlay muted loop playsInline preload="auto" aria-hidden="true" disablePictureInPicture
          className="absolute inset-0 size-full object-cover" />
      ) : (
        <img src={image} alt="" className="animate-kenburns absolute inset-0 size-full object-cover" />
      )}
      <div className="bg-hero-overlay absolute inset-0" />
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-5 pt-24 pb-16 text-center text-hero-ink">
        <div className="animate-rise text-xs font-medium uppercase tracking-[0.25em] text-hero-ink/75">{kicker}</div>
        <h1 className="animate-rise text-shadow-hero mt-5 font-display text-6xl font-light leading-[0.95] tracking-tight sm:text-7xl md:text-8xl" style={{ ["--d" as string]: "150ms" }}>{title}</h1>
        <p className="animate-rise text-shadow-hero mt-6 max-w-lg text-lg text-hero-ink/85" style={{ ["--d" as string]: "300ms" }}>{lede}</p>
        <ol className="animate-rise mt-12 w-full max-w-md space-y-2.5 text-sm" style={{ ["--d" as string]: "450ms" }}>
          {toc.map((t, i) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="group flex items-center gap-3 text-hero-ink/85 transition-colors hover:text-hero-ink">
                <span className="w-8 text-left text-xs tabular-nums text-hero-ink/55">({i + 1})</span>
                <span className="leader h-2 flex-1 text-hero-ink/35 transition-colors group-hover:text-hero-ink/70" />
                <span className="transition-transform duration-300 group-hover:-translate-x-1">{t.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
      <a href={`#${toc[0]?.id}`} aria-label="Листать вниз" className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-hero-ink/70">
        <ArrowDown className="size-5" />
      </a>
    </section>
  );
}
