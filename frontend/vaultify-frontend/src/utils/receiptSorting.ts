import type { ReadReceiptDto } from "../types/receipt";

export type SortOption = "warranty-asc" | "date-desc" | "price-asc" | "price-desc";

function toTime(value: string | null): number | null {
  if (!value) return null;
  const t = new Date(value).getTime();
  return Number.isNaN(t) ? null : t;
}

export function sortByWarrantyEndDateSoonestFirst(receipts: ReadReceiptDto[]) {
  return sortReceipts(receipts, "warranty-asc");
}

export function sortReceipts(receipts: ReadReceiptDto[], sort: SortOption): ReadReceiptDto[] {
  return [...receipts].sort((a, b) => {
    if (sort === "warranty-asc") {
      const aTime = toTime(a.warrantyEndDate);
      const bTime = toTime(b.warrantyEndDate);
      if (aTime === null && bTime === null) return 0;
      if (aTime === null) return 1;
      if (bTime === null) return -1;
      return aTime - bTime;
    }
    if (sort === "date-desc") {
      return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
    }
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });
}
