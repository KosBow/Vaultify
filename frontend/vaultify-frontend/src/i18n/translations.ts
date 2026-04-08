export type Language = "en" | "sv";

export type TranslationKey =
  // App shell
  | "warrantyTracker"
  | "dashboard"
  | "settings"
  | "addReceipt"
  | "storage"
  | "receiptsStored"
  | "searchPlaceholder"
  | "toggleTheme"
  | "settingsComingSoon"
  // Receipt list
  | "allCategories"
  | "noReceipts"
  // Receipt card
  | "store"
  | "price"
  | "warrantyEnds"
  | "noWarranty"
  | "warrantyExpired"
  | "warrantyExpiringSoon"
  | "warrantyActive"
  | "daysLeft"
  // Filters & sort
  | "filterAll"
  | "filterActive"
  | "filterSoon"
  | "filterExpired"
  // Stats
  | "summaryTotal"
  | "summaryActive"
  | "summarySoon"
  | "summaryExpired"
  // Create / Edit form
  | "appTitle"
  | "createReceipt"
  | "editReceipt"
  | "title"
  | "category"
  | "purchaseDate"
  | "warrantyMonths"
  | "notes"
  | "currency"
  | "create"
  | "saving"
  | "saveChanges"
  | "cancel"
  // Validation
  | "titleRequired"
  | "storeRequired"
  | "priceInvalid"
  | "warrantyInvalid"
  | "createFailed"
  | "saveFailed"
  // Misc
  | "loadingReceipts";

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    // App shell
    warrantyTracker:    "Warranty Tracker",
    dashboard:          "Dashboard",
    settings:           "Settings",
    addReceipt:         "Add Receipt",
    storage:            "Storage",
    receiptsStored:     "{count} receipts stored",
    searchPlaceholder:  "Search receipts...",
    toggleTheme:        "Toggle theme",
    settingsComingSoon: "Settings coming soon.",

    // Receipt list
    allCategories: "All",
    noReceipts:    "No receipts found.",

    // Receipt card
    store:                "Store",
    price:                "Price",
    warrantyEnds:         "Warranty ends",
    noWarranty:           "No warranty",
    warrantyExpired:      "Expired",
    warrantyExpiringSoon: "Expiring soon",
    warrantyActive:       "Active",
    daysLeft:             "{days} days left",

    // Filters & sort
    filterAll:     "All",
    filterActive:  "Active",
    filterSoon:    "Expiring soon",
    filterExpired: "Expired",

    // Stats
    summaryTotal:   "Total",
    summaryActive:  "Active",
    summarySoon:    "Expiring soon",
    summaryExpired: "Expired",

    // Create / Edit form
    appTitle:       "Vaultify",
    createReceipt:  "Add Receipt",
    editReceipt:    "Edit Receipt",
    title:          "Title",
    category:       "Category",
    purchaseDate:   "Purchase date",
    warrantyMonths: "Warranty (months)",
    notes:          "Notes",
    currency:       "Currency",
    create:         "Create",
    saving:         "Saving...",
    saveChanges:    "Save Changes",
    cancel:         "Cancel",

    // Validation
    titleRequired:   "Title is required",
    storeRequired:   "Store is required",
    priceInvalid:    "Price must be 0.01 or more",
    warrantyInvalid: "Warranty months must be 0 or more",
    createFailed:    "Failed to create receipt",
    saveFailed:      "Failed to save changes.",

    // Misc
    loadingReceipts: "Loading receipts...",
  },

  sv: {
    // App shell
    warrantyTracker:    "Garantispårare",
    dashboard:          "Instrumentpanel",
    settings:           "Inställningar",
    addReceipt:         "Lägg till kvitto",
    storage:            "Lagring",
    receiptsStored:     "{count} kvitton lagrade",
    searchPlaceholder:  "Sök kvitton...",
    toggleTheme:        "Växla tema",
    settingsComingSoon: "Inställningar kommer snart.",

    // Receipt list
    allCategories: "Alla",
    noReceipts:    "Inga kvitton hittades.",

    // Receipt card
    store:                "Butik",
    price:                "Pris",
    warrantyEnds:         "Garanti slutar",
    noWarranty:           "Ingen garanti",
    warrantyExpired:      "Utgången",
    warrantyExpiringSoon: "Snart utgående",
    warrantyActive:       "Aktiv",
    daysLeft:             "{days} dagar kvar",

    // Filters & sort
    filterAll:     "Alla",
    filterActive:  "Aktiva",
    filterSoon:    "Snart utgående",
    filterExpired: "Utgångna",

    // Stats
    summaryTotal:   "Totalt",
    summaryActive:  "Aktiva",
    summarySoon:    "Snart utgående",
    summaryExpired: "Utgångna",

    // Create / Edit form
    appTitle:       "Vaultify",
    createReceipt:  "Lägg till kvitto",
    editReceipt:    "Redigera kvitto",
    title:          "Titel",
    category:       "Kategori",
    purchaseDate:   "Köpedatum",
    warrantyMonths: "Garanti (månader)",
    notes:          "Anteckningar",
    currency:       "Valuta",
    create:         "Skapa",
    saving:         "Sparar...",
    saveChanges:    "Spara ändringar",
    cancel:         "Avbryt",

    // Validation
    titleRequired:   "Titel krävs",
    storeRequired:   "Butik krävs",
    priceInvalid:    "Pris måste vara minst 0.01",
    warrantyInvalid: "Garantimånader måste vara 0 eller mer",
    createFailed:    "Kunde inte skapa kvitto",
    saveFailed:      "Kunde inte spara ändringar.",

    // Misc
    loadingReceipts: "Laddar kvitton...",
  },
};
