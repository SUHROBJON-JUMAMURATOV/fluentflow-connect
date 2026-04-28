import { useLang } from "@/i18n/LanguageContext";
import img1 from "@/assets/process-1.jpg";
import img2 from "@/assets/process-2.jpg";
import img3 from "@/assets/process-3.jpg";
import img4 from "@/assets/process-4.jpg";
import img5 from "@/assets/process-5.jpg";
import img6 from "@/assets/process-6.jpg";
import img7 from "@/assets/process-7.jpg";

export function Gallery() {
  const { t } = useLang();

  const items = [
    { src: img1, key: "faucet" as const },
    { src: img2, key: "pipe" as const },
    { src: img3, key: "drain" as const },
    { src: img4, key: "leak" as const },
    { src: img5, key: "toilet" as const },
    { src: img6, key: "boiler" as const },
    { src: img7, key: "washer" as const },
  ];

  return (
    <section id="gallery" className="container py-20 md:py-28">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t.gallery.title}
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">{t.gallery.subtitle}</p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, idx) => (
          <figure
            key={idx}
            className={[
              "group relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card animate-fade-up",
              idx === 0 ? "lg:col-span-2 lg:row-span-2" : "",
            ].join(" ")}
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <img
              src={it.src}
              alt={t.services.items[it.key]}
              loading="lazy"
              width={768}
              height={768}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
              <span className="text-sm font-semibold text-white">
                {t.services.items[it.key]}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}