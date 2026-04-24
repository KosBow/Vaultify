import type { Language } from "../i18n/translations";

export type ReceiptCategory =
  | "Electronics"
  | "Appliances"
  | "Furniture"
  | "Tools & Hardware"
  | "Clothing & Shoes"
  | "Sports & Fitness"
  | "Automotive"
  | "Home & Garden"
  | "Health & Beauty"
  | "Toys & Games"
  | "Musical Instruments"
  | "Jewelry & Watches"
  | "Travel & Luggage"
  | "Office & Stationery"
  | "Baby & Kids"
  | "Pet Supplies"
  | "Other";

export const receiptCategories: ReceiptCategory[] = [
  "Electronics",
  "Appliances",
  "Furniture",
  "Tools & Hardware",
  "Clothing & Shoes",
  "Sports & Fitness",
  "Automotive",
  "Home & Garden",
  "Health & Beauty",
  "Toys & Games",
  "Musical Instruments",
  "Jewelry & Watches",
  "Travel & Luggage",
  "Office & Stationery",
  "Baby & Kids",
  "Pet Supplies",
  "Other",
];

export const categoryIcons: Record<ReceiptCategory, string> = {
  "Electronics":        "💻",
  "Appliances":         "🔌",
  "Furniture":          "🪑",
  "Tools & Hardware":   "🔧",
  "Clothing & Shoes":   "👟",
  "Sports & Fitness":   "🏋️",
  "Automotive":         "🚗",
  "Home & Garden":      "🏡",
  "Health & Beauty":    "💊",
  "Toys & Games":       "🎮",
  "Musical Instruments":"🎸",
  "Jewelry & Watches":  "⌚",
  "Travel & Luggage":   "🧳",
  "Office & Stationery":"🖨️",
  "Baby & Kids":        "🍼",
  "Pet Supplies":       "🐾",
  "Other":              "📁",
};

const categoryLabels: Record<Language, Record<ReceiptCategory, string>> = {
  en: {
    "Electronics":         "Electronics",
    "Appliances":          "Appliances",
    "Furniture":           "Furniture",
    "Tools & Hardware":    "Tools & Hardware",
    "Clothing & Shoes":    "Clothing & Shoes",
    "Sports & Fitness":    "Sports & Fitness",
    "Automotive":          "Automotive",
    "Home & Garden":       "Home & Garden",
    "Health & Beauty":     "Health & Beauty",
    "Toys & Games":        "Toys & Games",
    "Musical Instruments": "Musical Instruments",
    "Jewelry & Watches":   "Jewelry & Watches",
    "Travel & Luggage":    "Travel & Luggage",
    "Office & Stationery": "Office & Stationery",
    "Baby & Kids":         "Baby & Kids",
    "Pet Supplies":        "Pet Supplies",
    "Other":               "Other",
  },
  sv: {
    "Electronics":         "Elektronik",
    "Appliances":          "Vitvaror",
    "Furniture":           "Möbler",
    "Tools & Hardware":    "Verktyg & Bygg",
    "Clothing & Shoes":    "Kläder & Skor",
    "Sports & Fitness":    "Sport & Träning",
    "Automotive":          "Fordon",
    "Home & Garden":       "Hem & Trädgård",
    "Health & Beauty":     "Hälsa & Skönhet",
    "Toys & Games":        "Leksaker & Spel",
    "Musical Instruments": "Musikinstrument",
    "Jewelry & Watches":   "Smycken & Klockor",
    "Travel & Luggage":    "Resor & Bagage",
    "Office & Stationery": "Kontor & Kontorsmaterial",
    "Baby & Kids":         "Baby & Barn",
    "Pet Supplies":        "Husdjur",
    "Other":               "Övrigt",
  },
};

export function getCategoryLabel(category: ReceiptCategory, language: Language): string {
  return categoryLabels[language][category];
}
