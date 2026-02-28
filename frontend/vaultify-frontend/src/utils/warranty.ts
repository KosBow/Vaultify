import { parseDateOnly } from "./format";

export type WarrantyStatus = "expired" | "soon" | "active" | null;

export type WarrantyResult = {
  status: WarrantyStatus;
  daysLeft: number | null;
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function calculateWarranty(
  warrantyEndDate: string | null,
  today: Date = new Date(),
  soonThresholdDays: number = 90
): WarrantyResult {
  if (!warrantyEndDate) return { status: null, daysLeft: null };

  const end = parseDateOnly(warrantyEndDate);
  if (!end) return { status: null, daysLeft: null };

  // normalize today to date-only (remove time portion)
  const todayDateOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const diffInMS = end.getTime() - todayDateOnly.getTime();
  const daysLeft = Math.ceil(diffInMS / MS_PER_DAY);

  if (daysLeft < 0) return { status: "expired", daysLeft };
  if (daysLeft <= soonThresholdDays) return { status: "soon", daysLeft };
  return { status: "active", daysLeft };
}