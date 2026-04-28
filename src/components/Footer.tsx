import { Wrench, Code2, Sparkles } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="container flex flex-col items-center gap-6 py-10">
        <div className="flex w-full flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg gradient-hero">
              <Wrench className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="text-sm font-semibold">SANTEXNIKA UZ</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SANTEXNIKA UZ — {t.footer}
          </p>
        </div>

        <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-primary/20 bg-card p-[1px]">
          <span className="pointer-events-none absolute inset-0 rounded-2xl gradient-hero opacity-20" />
          <div className="relative flex flex-col items-center gap-2 rounded-2xl bg-card/90 px-6 py-5 text-center backdrop-blur">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              <Code2 className="h-3.5 w-3.5" />
              {t.author}
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div className="text-base font-bold sm:text-lg">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
                Jumamuratov Suhrobjon Xamzayevich
              </span>
            </div>
            <span className="block h-0.5 w-24 rounded-full gradient-hero shadow-glow" />
          </div>
        </div>
      </div>
    </footer>
  );
}