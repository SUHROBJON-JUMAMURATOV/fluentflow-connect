import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { Phone, Sparkles, Clock } from "lucide-react";

const PHONE_TEL = "+998200003916";

export function Hero() {
  const { t } = useLang();
  const scrollToOrder = () =>
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative overflow-hidden gradient-soft">
      <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-float-slow" />
      <div
        className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-float-slow"
        style={{ animationDelay: "2s" }}
      />

      <div className="container relative grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {t.hero.eyebrow}
          </div>

          <div className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-success/30 bg-success/10 px-4 py-1.5 text-sm font-semibold text-success shadow-soft animate-pulse-glow">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
            </span>
            <Clock className="h-4 w-4" />
            <span>24/7 — {t.hero.badge247}</span>
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {t.hero.title}
          </h1>

          <p className="mt-5 max-w-xl text-lg text-muted-foreground text-balance">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button onClick={scrollToOrder} variant="hero" size="lg" className="btn-shine">
              {t.hero.cta}
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={`tel:${PHONE_TEL}`}>
                <Phone className="h-4 w-4" />
                {t.hero.callNow}
              </a>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div>
              <div className="text-2xl font-bold text-foreground">5000+</div>
              <div>orders</div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="text-2xl font-bold text-foreground">24/7</div>
              <div>online</div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="text-2xl font-bold text-foreground">30 min</div>
              <div>arrival</div>
            </div>
          </div>
        </div>

        <div className="relative animate-scale-in" style={{ animationDelay: "0.2s" }}>
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="absolute inset-0 rounded-[3rem] gradient-hero shadow-glow rotate-3" />
            <div className="absolute inset-2 rounded-[3rem] bg-card/95 backdrop-blur shadow-card -rotate-3 grid place-items-center p-8">
              <svg viewBox="0 0 200 200" className="h-full w-full text-primary" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M40 60 L40 140 L80 140 L80 100 L120 100 L120 140 L160 140 L160 60" className="text-primary/30" />
                <circle cx="100" cy="50" r="14" />
                <path d="M100 64 L100 90" />
                <path d="M70 50 L86 50" />
                <path d="M114 50 L130 50" />
                <path d="M60 170 L140 170" className="text-accent" strokeWidth="4" />
                <circle cx="100" cy="50" r="6" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}