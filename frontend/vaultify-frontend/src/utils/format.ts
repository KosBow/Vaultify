import type { currency } from "../types/receipt";
import type { Language } from "../i18n/translations";

export function getLocale(language: Language) {
    return language === "sv" ? "sv-SE" : "en-US";
}

export function formatCurrency(amount: number, curr: currency, language: Language) {
    const locale = getLocale(language);

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: curr,
        currencyDisplay: "symbol",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount);
}

export function formatDate(dateIso: string, language: Language) {
    const locale = getLocale(language);
    const d = new Date(dateIso);

    if (Number.isNaN(d.getTime())) return "_";

    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(d);
}