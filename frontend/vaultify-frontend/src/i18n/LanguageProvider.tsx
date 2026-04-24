import { useEffect, useMemo, useState } from "react";
import { LanguageContext } from "./LanguageContext";
import type { Language } from "./translations";

const STORAGE_KEY = "vaultify-language";

type Props = {
  children: React.ReactNode;
  defaultLanguage?: Language;
};

export function LanguageProvider({ children, defaultLanguage = "sv" }: Props) {
  const browserLang: Language = navigator.language.startsWith("sv")
    ? "sv"
    : "en";

  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === "sv" || saved === "en") {
      return saved;
    }

    return browserLang ?? defaultLanguage;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
