import type { ReadReceiptDto } from "../types/receipt";
import { calculateWarranty } from "./warranty";

export function getReceiptSummary(receipts: ReadReceiptDto[]) {
let expired = 0;
let soon = 0;
let active = 0;

for (const r of receipts) {
    const { status } = calculateWarranty(r.warrantyEndDate);
    if (status === "expired") expired++;
    else if (status === "soon") soon++;
    else if (status === "active") active++;
}

return { total: receipts.length, expired, soon, active};
}