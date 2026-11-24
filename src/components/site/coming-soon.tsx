import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function ComingSoon({ num, title, text, image }: { num: string; title: string; text: string; image: string }) {
  return (
    <main className="relative flex min-h-[80vh] items-end overflow-hidden">
      <img src={image} alt="" className="animate-kenburns absolute inset-0 size-full object-cover" />
      <div className="bg-hero-overlay absolute inset-0" />
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-40">
        <div className="animate-rise font-display text-sm text-muted-foreground">({num}) · раздел готовится</div>
        <h1 className="animate-rise mt-3 font-display text-6xl tracking-tight md:text-8xl" style={{ ["--d" as string]: "120ms" }}>{title}</h1>
        <p className="animate-rise mt-5 max-w-xl text-lg text-muted-foreground" style={{ ["--d" as string]: "240ms" }}>{text}</p>
        <Link to="/" className="animate-rise mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary" style={{ ["--d" as string]: "360ms" }}>
          <ArrowLeft className="size-4" /> На главную
        </Link>
      </div>
    </main>
  );
}
