import { createContext } from "react";
import type { Language } from "./translations";

export type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

export const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
});
