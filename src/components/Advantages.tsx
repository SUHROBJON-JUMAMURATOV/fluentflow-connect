import { Clock, Zap, BadgeDollarSign } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export function Advantages() {
  const { t } = useLang();

  const items = [
    { key: "always" as const, Icon: Clock },
    { key: "fast" as const, Icon: Zap },
    { key: "cheap" as const, Icon: BadgeDollarSign },
  ];

  return (
    <section id="advantages" className="relative py-20 md:py-28">
      <div className="absolute inset-0 gradient-soft" />
      <div className="container relative">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t.advantages.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map(({ key, Icon }, idx) => (
            <div
              key={key}
              className="group relative rounded-3xl border border-border bg-card p-8 shadow-soft transition-all duration-500 hover:shadow-card animate-fade-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-8 w-8" strokeWidth={2.2} />
              </div>
              <h3 className="mt-6 text-xl font-bold">{t.advantages.items[key]}</h3>
              <p className="mt-2 text-muted-foreground">{t.advantages.desc[key]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}