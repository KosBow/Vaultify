export type ReceiptCategory =
  | "Electronics"
  | "Appliances"
  | "Furniture"
  | "Tools"
  | "Clothing"
  | "General"
  | "Other";

export const receiptCategories: ReceiptCategory[] = [
  "Electronics",
  "Appliances",
  "Furniture",
  "Tools",
  "Clothing",
  "General",
  "Other",
];

export const categoryIcons: Record<ReceiptCategory, string> = {
  Electronics: "💻",
  Appliances: "🔌",
  Furniture: "🪑",
  Tools: "🔧",
  Clothing: "👕",
  General: "📦",
  Other: "📁",
};