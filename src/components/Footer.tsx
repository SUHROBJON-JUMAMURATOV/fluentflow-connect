import { Wrench, Code2 } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="container flex flex-col gap-4 py-8">
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

        <div className="self-center text-center sm:self-end sm:text-right">
          <div className="inline-flex flex-col gap-1 rounded-lg border border-primary/15 bg-background/35 px-3 py-2 backdrop-blur">
            <div className="inline-flex items-center justify-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-primary sm:justify-end">
              <Code2 className="h-3.5 w-3.5" />
              {t.author}
            </div>
            <div className="text-xs font-semibold sm:text-sm">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
                Jumamuratov Suhrobjon Xamzayevich
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}