import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";
import { translations, type TranslationKey } from "./translations";

function format(template: string, params?: Record<string, string | number>) {
  if (!params) return template;

  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const value = params[key];
    return value === undefined ? `{${key}}` : String(value);
  });
}

export function useTranslation() {
  const { language, setLanguage } = useContext(LanguageContext);

  const t = (key: TranslationKey, params?: Record<string, string | number>) => {
    const template = translations[language][key];
    return format(template, params);
  };

  return { t, language, setLanguage };
}