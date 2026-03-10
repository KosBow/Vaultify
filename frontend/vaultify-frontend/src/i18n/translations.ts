export type Language = "en" | "sv";

export type TranslationKey =
  | "appTitle"
  | "noReceipts"
  | "title"
  | "store"
  | "price"
  | "currency"
  | "purchaseDate"
  | "warrantyMonths"
  | "createReceipt"
  | "create"
  | "saving"
  | "titleRequired"
  | "storeRequired"
  | "priceInvalid"
  | "warrantyInvalid"
  | "createFailed"
  | "warrantyEnds"
  | "noWarranty"
  | "warrantyExpired"
  | "warrantyExpiringSoon"
  | "warrantyActive"
  | "daysLeft"
  | "filterAll"
  | "filterActive"
  | "filterSoon"
  | "filterExpired"
  | "filterExpired"
  | "summaryTotal"
  | "summaryActive"
  | "summarySoon"
  | "summaryExpired"
  | "loadingReceipts";

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    appTitle: "Vaultify",
    noReceipts: "No receipts found.",

    title: "Title",
    store: "Store",
    price: "Price",
    currency: "Currency",
    purchaseDate: "Purchase date",
    warrantyMonths: "Warranty months",

    createReceipt: "Create receipt",
    create: "Create",
    saving: "Saving...",

    titleRequired: "Title is required",
    storeRequired: "Store is required",
    priceInvalid: "Price must be 0.01 or more",
    warrantyInvalid: "Warranty months must be 0 or more",
    createFailed: "Failed to create receipt",

    warrantyEnds: "Warranty ends",
    noWarranty: "No warranty",
    warrantyExpired: "Warranty expired",
    warrantyExpiringSoon: "Expiring soon",
    warrantyActive: "Active",
    daysLeft: "{days} days left",

    filterAll: "All",
    filterActive: "Active",
    filterSoon: "Expiring soon",
    filterExpired: "Expired",

    summaryTotal: "Total",
    summaryActive: "Active",
    summarySoon: "Expiring soon",
    summaryExpired: "Expired",

    loadingReceipts: "Loading receipts...",
  },

  sv: {
    appTitle: "Vaultify",
    noReceipts: "Inga kvitton hittades.",

    title: "Titel",
    store: "Butik",
    price: "Pris",
    currency: "Valuta",
    purchaseDate: "Köpedatum",
    warrantyMonths: "Garanti (månader)",

    createReceipt: "Skapa kvitto",
    create: "Skapa",
    saving: "Sparar...",

    titleRequired: "Titel krävs",
    storeRequired: "Butik krävs",
    priceInvalid: "Pris måste vara minst 0.01",
    warrantyInvalid: "Garantimånader måste vara 0 eller mer",
    createFailed: "Kunde inte skapa kvitto",

    warrantyEnds: "Garanti slutar",
    noWarranty: "Ingen garanti",
    warrantyExpired: "Garanti har gått ut",
    warrantyExpiringSoon: "Går snart ut",
    warrantyActive: "Aktiv",
    daysLeft: "{days} dagar kvar",

    filterAll: "Alla",
    filterActive: "Aktiva",
    filterSoon: "Snart utgående",
    filterExpired: "Utgångna",

    summaryTotal: "Totalt",
    summaryActive: "Aktiva",
    summarySoon: "Snart utgående",
    summaryExpired: "Utgångna",

    loadingReceipts: "Laddar kvitton...",
  },
};
