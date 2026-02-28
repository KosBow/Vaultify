import type { currency } from "../types/receipt";
import type { Language } from "../i18n/translations";

export function getLocale(language: Language) {
  return language === "sv" ? "sv-SE" : "en-US";
}

// 🔹 Date-only parser (YYYY-MM-DD → local Date without timezone shift)
export function parseDateOnly(dateOnly: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateOnly);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const d = new Date(year, month - 1, day);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatCurrency(
  amount: number,
  curr: currency,
  language: Language
) {
  const locale = getLocale(language);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: curr,
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateOnly: string, language: Language) {
  const locale = getLocale(language);

  const d = parseDateOnly(dateOnly);
  if (!d) return "_";

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}