import { useMemo, useState } from "react";
import { LanguageContext } from "./LanguageContext";
import type { Language } from "./translations";

type Props = {
  children: React.ReactNode;
  defaultLanguage?: Language;
};

export function LanguageProvider({ children, defaultLanguage = "en" }: Props) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
