export type Language = "en" | "sv";

export type TranslationKey =
  | "appTitle"
  | "noReceipts"
  | "store"
  | "price"
  | "warrantyEnds"
  | "noWarranty"
  | "warrantyExpired"
  | "warrantyExpiringSoon"
  | "warrantyActive"
  | "daysLeft";

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    appTitle: "Vaultify",
    noReceipts: "No receipts found.",
    store: "Store",
    price: "Price",
    warrantyEnds: "Warranty ends",
    noWarranty: "No warranty",
    warrantyExpired: "Warranty expired",
    warrantyExpiringSoon: "Expiring soon",
    warrantyActive: "Active",
    daysLeft: "{days} days left",
  },
  sv: {
    appTitle: "Vaultify",
    noReceipts: "Inga kvitton hittades.",
    store: "Butik",
    price: "Pris",
    warrantyEnds: "Garanti slutar",
    noWarranty: "Ingen garanti",
    warrantyExpired: "Garanti har gått ut",
    warrantyExpiringSoon: "Går snart ut",
    warrantyActive: "Aktiv",
    daysLeft: "{days} dagar kvar",
  },
};
