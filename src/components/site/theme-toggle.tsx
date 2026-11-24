import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";

export function ThemeToggle({ onHero = false }: { onHero?: boolean }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("theme", next);
      flushSync(() => setTheme(next));
    };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }
    const x = e.clientX;
    const y = e.clientY;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    doc.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(.4,0,.2,1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  const dark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Включить светлую тему" : "Включить тёмную тему"}
      className={`relative flex h-9 w-[68px] items-center rounded-full border p-1 transition-colors ${
        onHero ? "border-hero-ink/40 bg-hero-ink/15" : "border-foreground/20 bg-muted"
      }`}
    >
      <Sun className={`absolute left-2.5 size-3.5 transition-opacity ${onHero ? "text-hero-ink" : "text-foreground/80"} ${dark ? "opacity-100" : "opacity-0"}`} />
      <Moon className={`absolute right-2.5 size-3.5 transition-opacity ${onHero ? "text-hero-ink" : "text-foreground/80"} ${dark ? "opacity-0" : "opacity-100"}`} />
      <span
        className={`relative z-10 grid size-7 place-items-center rounded-full bg-hero-ink shadow-[0_2px_10px_oklch(0_0_0/0.35)] transition-transform duration-500 ease-[cubic-bezier(.5,1.6,.4,1)] ${
          dark ? "translate-x-[30px]" : "translate-x-0"
        }`}
      >
        {dark ? <Moon className="size-3.5 fill-ink-dark text-ink-dark" /> : <Sun className="size-3.5 text-ember" strokeWidth={2.5} />}
      </span>
    </button>
  );
}
