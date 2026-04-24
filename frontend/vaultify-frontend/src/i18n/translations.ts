export type Language = "en" | "sv";

export type TranslationKey =
  | "tagline"
  | "warrantyTracker"
  | "dashboard"
  | "settings"
  | "addReceipt"
  | "storage"
  | "receiptsStored"
  | "searchPlaceholder"
  | "toggleTheme"
  | "notifications"
  | "expiringCount"
  | "allWarrantiesGood"
  | "daysLeftShort"
  | "allCategories"
  | "noReceipts"
  | "noReceiptsYet"
  | "noReceiptsYetDesc"
  | "noResults"
  | "noResultsDesc"
  | "store"
  | "price"
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
  | "sortWarrantyAsc"
  | "sortDateDesc"
  | "sortPriceDesc"
  | "sortPriceAsc"
  | "summaryTotal"
  | "summaryActive"
  | "summarySoon"
  | "summaryExpired"
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
  | "receiptImageOptional"
  | "receiptImage"
  | "clickToUpload"
  | "uploadImage"
  | "uploadingImage"
  | "titleRequired"
  | "storeRequired"
  | "priceInvalid"
  | "warrantyInvalid"
  | "createFailed"
  | "saveFailed"
  | "appearance"
  | "theme"
  | "darkModeOn"
  | "lightModeOn"
  | "language"
  | "about"
  | "settingsComingSoon"
  | "loadingReceipts"
  | "clearAll"
  | "confirmDelete"
  | "deleteReceipt"
  | "toastCreated"
  | "toastSaved"
  | "toastDeleted"
  | "imageUploadFailed";

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    tagline:            "Your receipt vault",
    warrantyTracker:    "Warranty Tracker",
    dashboard:          "Dashboard",
    settings:           "Settings",
    addReceipt:         "Add Receipt",
    storage:            "Storage",
    receiptsStored:     "{count} receipts stored",
    searchPlaceholder:  "Search receipts...",
    toggleTheme:        "Toggle theme",
    notifications:      "Notifications",
    expiringCount:      "{count} expiring",
    allWarrantiesGood:  "All warranties are good",
    daysLeftShort:      "{days}d left",

    allCategories: "All",
    noReceipts:    "No receipts found.",
    noReceiptsYet: "No receipts yet",
    noReceiptsYetDesc: "Add your first receipt to start tracking warranties and purchases.",
    noResults:     "No results found",
    noResultsDesc: "Try adjusting your search or filters",

    store:                "Store",
    price:                "Price",
    warrantyEnds:         "Warranty ends",
    noWarranty:           "No warranty",
    warrantyExpired:      "Expired",
    warrantyExpiringSoon: "Expiring soon",
    warrantyActive:       "Active",
    daysLeft:             "{days} days left",

    filterAll:     "All",
    filterActive:  "Active",
    filterSoon:    "Expiring soon",
    filterExpired: "Expired",

    sortWarrantyAsc: "Warranty (soonest)",
    sortDateDesc:    "Purchase date (newest)",
    sortPriceDesc:   "Price (high → low)",
    sortPriceAsc:    "Price (low → high)",

    summaryTotal:   "Total",
    summaryActive:  "Active",
    summarySoon:    "Expiring soon",
    summaryExpired: "Expired",

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

    receiptImageOptional: "Receipt Image (optional)",
    receiptImage:         "Receipt Image",
    clickToUpload:        "Click to upload image",
    uploadImage:          "Upload image",
    uploadingImage:       "Uploading image...",

    titleRequired:   "Title is required",
    storeRequired:   "Store is required",
    priceInvalid:    "Price must be 0.01 or more",
    warrantyInvalid: "Warranty months must be 0 or more",
    createFailed:    "Failed to create receipt",
    saveFailed:      "Failed to save changes.",

    appearance:         "Appearance",
    theme:              "Theme",
    darkModeOn:         "Dark mode is on",
    lightModeOn:        "Light mode is on",
    language:           "Language",
    about:              "About",
    settingsComingSoon: "Settings coming soon.",

    loadingReceipts: "Loading receipts...",
    clearAll:      "Clear all",
    confirmDelete: "Delete?",
    deleteReceipt: "Delete receipt",
    toastCreated:      "Receipt added",
    toastSaved:        "Changes saved",
    toastDeleted:      "Receipt deleted",
    imageUploadFailed: "Failed to upload image. Try again.",
  },

  sv: {
    tagline:            "Ditt kvittovalv",
    warrantyTracker:    "Garantispårare",
    dashboard:          "Instrumentpanel",
    settings:           "Inställningar",
    addReceipt:         "Lägg till kvitto",
    storage:            "Lagring",
    receiptsStored:     "{count} kvitton lagrade",
    searchPlaceholder:  "Sök kvitton...",
    toggleTheme:        "Växla tema",
    notifications:      "Notifieringar",
    expiringCount:      "{count} snart utgående",
    allWarrantiesGood:  "Alla garantier är okej",
    daysLeftShort:      "{days}d kvar",

    allCategories: "Alla",
    noReceipts:    "Inga kvitton hittades.",
    noReceiptsYet: "Inga kvitton ännu",
    noReceiptsYetDesc: "Lägg till ditt första kvitto för att börja spåra garantier och köp.",
    noResults:     "Inga resultat hittades",
    noResultsDesc: "Prova att justera sökning eller filter",

    store:                "Butik",
    price:                "Pris",
    warrantyEnds:         "Garanti slutar",
    noWarranty:           "Ingen garanti",
    warrantyExpired:      "Utgången",
    warrantyExpiringSoon: "Snart utgående",
    warrantyActive:       "Aktiv",
    daysLeft:             "{days} dagar kvar",

    filterAll:     "Alla",
    filterActive:  "Aktiva",
    filterSoon:    "Snart utgående",
    filterExpired: "Utgångna",

    sortWarrantyAsc: "Garanti (snart)",
    sortDateDesc:    "Köpdatum (nyast)",
    sortPriceDesc:   "Pris (högt → lågt)",
    sortPriceAsc:    "Pris (lågt → högt)",

    summaryTotal:   "Totalt",
    summaryActive:  "Aktiva",
    summarySoon:    "Snart utgående",
    summaryExpired: "Utgångna",

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

    receiptImageOptional: "Kvittobild (valfritt)",
    receiptImage:         "Kvittobild",
    clickToUpload:        "Klicka för att ladda upp bild",
    uploadImage:          "Ladda upp bild",
    uploadingImage:       "Laddar upp bild...",

    titleRequired:   "Titel krävs",
    storeRequired:   "Butik krävs",
    priceInvalid:    "Pris måste vara minst 0.01",
    warrantyInvalid: "Garantimånader måste vara 0 eller mer",
    createFailed:    "Kunde inte skapa kvitto",
    saveFailed:      "Kunde inte spara ändringar.",

    appearance:         "Utseende",
    theme:              "Tema",
    darkModeOn:         "Mörkt läge är på",
    lightModeOn:        "Ljust läge är på",
    language:           "Språk",
    about:              "Om",
    settingsComingSoon: "Inställningar kommer snart.",

    loadingReceipts: "Laddar kvitton...",
    clearAll:      "Rensa alla",
    confirmDelete: "Radera?",
    deleteReceipt: "Radera kvitto",
    toastCreated:      "Kvitto tillagt",
    toastSaved:        "Ändringar sparade",
    toastDeleted:      "Kvitto raderat",
    imageUploadFailed: "Kunde inte ladda upp bilden. Försök igen.",
  },
};
