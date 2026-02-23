import type { ReadReceiptDto } from "../types/receipt";

function toTime(value: string | null): number | null {
  if (!value) return null;
  const t = new Date(value).getTime();
  return Number.isNaN(t) ? null : t;
}

export function sortByWarrantyEndDateSoonestFirst(receipts: ReadReceiptDto[]) {
  return [...receipts].sort((a, b) => {
    const aTime = toTime(a.warrantyEndDate);
    const bTime = toTime(b.warrantyEndDate);

    if (aTime === null && bTime === null) return 0;
    if (aTime === null) return 1;
    if (bTime === null) return -1;

    return aTime - bTime;
  });
}