import { Droplets, Wrench, Pipette, ShowerHead, Toilet, Flame, WashingMachine, Thermometer } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export function Services() {
  const { t } = useLang();

  const items = [
    { key: "faucet" as const, Icon: Wrench },
    { key: "pipe" as const, Icon: Pipette },
    { key: "drain" as const, Icon: ShowerHead },
    { key: "leak" as const, Icon: Droplets },
    { key: "toilet" as const, Icon: Toilet },
    { key: "boiler" as const, Icon: Flame },
    { key: "washer" as const, Icon: WashingMachine },
    { key: "heating" as const, Icon: Thermometer },
  ];

  return (
    <section id="services" className="container py-20 md:py-28">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t.services.title}
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">{t.services.subtitle}</p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ key, Icon }, idx) => (
          <div
            key={key}
            className="group relative overflow-hidden rounded-3xl border border-border gradient-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-card animate-fade-up"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-primary/10" />
            <div className="relative">
              <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-hero text-primary-foreground shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Icon className="h-7 w-7" strokeWidth={2.2} />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{t.services.items[key]}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t.services.itemDesc[key]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}