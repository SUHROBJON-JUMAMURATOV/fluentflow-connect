import { Wrench } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="container flex flex-col items-center justify-between gap-3 py-8 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg gradient-hero">
            <Wrench className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="text-sm font-semibold">PlumbingPro</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} PlumbingPro — {t.footer}
        </p>
      </div>
    </footer>
  );
}