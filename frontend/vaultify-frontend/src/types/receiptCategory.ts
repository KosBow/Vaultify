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
