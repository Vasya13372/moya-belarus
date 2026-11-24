import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandMark } from "./brand-mark";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { to: "/", label: "Главная" },
  { to: "/history", label: "История" },
  { to: "/culture", label: "Культура" },
  { to: "/tourism", label: "Туризм" },
  { to: "/traditions", label: "Традиции" },
  { to: "/quiz", label: "Викторина" },
] as const;

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  const onHero = path === "/" && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        onHero ? "bg-transparent" : "glass border-b border-border"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className={`flex items-center gap-2.5 font-semibold tracking-tight ${onHero ? "text-hero-ink" : "text-foreground"}`}>
          <BrandMark className="size-7" />
          <span className="text-[15px]">Моя Беларусь</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const active = path === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`relative rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
                  onHero
                    ? active ? "bg-hero-ink/15 text-hero-ink" : "text-hero-ink/70 hover:text-hero-ink"
                    : active ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle onHero={onHero} />
          <button
            className={`grid size-9 place-items-center rounded-full md:hidden ${onHero ? "text-hero-ink" : "text-foreground"}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Меню"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="animate-in fade-in slide-in-from-top-2 flex flex-col gap-1 border-t border-border px-5 py-4 md:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className={`rounded-lg px-3 py-2.5 text-sm ${path === n.to ? "bg-muted text-foreground" : "text-muted-foreground"}`}>
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
