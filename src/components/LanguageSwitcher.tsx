import { LANGS, Lang } from "@/i18n/translations";
import { useLang } from "@/i18n/LanguageContext";

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card/80 p-1 backdrop-blur shadow-soft">
      {LANGS.map((l: Lang) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          data-active={lang === l}
          className="lang-pill rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all duration-300 hover:text-foreground"
          aria-label={`Switch language to ${l}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}