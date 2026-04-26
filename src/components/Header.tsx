import { Wrench, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

const PHONE = "+998 90 123 45 67";
const PHONE_TEL = "+998901234567";

export function Header() {
  const { t } = useLang();

  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-3">
        <a href="#" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-xl gradient-hero shadow-glow transition-transform duration-300 group-hover:rotate-12">
            <Wrench className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Plumbing<span className="text-primary">Pro</span>
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${PHONE_TEL}`}
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4" />
            {PHONE}
          </a>
          <LanguageSwitcher />
          <Button onClick={scrollToOrder} variant="hero" size="sm" className="hidden sm:inline-flex">
            {t.hero.cta}
          </Button>
        </div>
      </div>
    </header>
  );
}