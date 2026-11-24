import { useEffect, useRef, useState, type ReactNode } from "react";

export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, shown };
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, shown } = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} data-shown={shown} className={`reveal ${className}`} style={{ ["--d" as string]: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function CountUp({ value, decimals = 0, duration = 1600, start }: { value: number; decimals?: number; duration?: number; start: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setV(value * (1 - Math.pow(1 - p, 4)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, value, duration]);
  return <>{v.toLocaleString("ru-RU", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</>;
}

export function SectionHead({ num, kicker, title, lede }: { num: string; kicker: string; title: ReactNode; lede?: string }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        <span className="font-display text-sm normal-case tracking-normal text-muted-foreground">({num})</span>
        <span className="h-px w-8 bg-primary" />
        {kicker}
      </div>
      <h2 className="font-display text-4xl leading-[1.05] tracking-tight md:text-6xl">{title}</h2>
      {lede && <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{lede}</p>}
    </Reveal>
  );
}
