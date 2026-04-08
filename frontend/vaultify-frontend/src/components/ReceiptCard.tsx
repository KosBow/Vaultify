import type { ReadReceiptDto } from "../types/receipt";
import { useTranslation } from "../i18n/useTranslation";
import { calculateWarranty } from "../utils/warranty";
import { formatCurrency, formatDate } from "../utils/format";
import { categoryIcons } from "../types/receiptCategory";

type Props = {
  receipt: ReadReceiptDto;
  onDelete: (id: string) => void;
  onEdit: (receipt: ReadReceiptDto) => void;
};

const statusBadge: Record<string, string> = {
  active: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400",
  soon: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400",
  expired: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400",
  none: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
};

export function ReceiptCard({ receipt, onDelete, onEdit }: Props) {
  const { t, language } = useTranslation();
  const { status, daysLeft } = calculateWarranty(receipt.warrantyEndDate);

  const badgeCls = statusBadge[status ?? "none"];

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 leading-snug">
          {receipt.title}
        </h3>
        <div className="flex gap-1 shrink-0">
          <button
            onClick={() => onEdit(receipt)}
            title="Edit"
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-xs"
          >
            ✏️
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Delete "${receipt.title}"?`)) onDelete(receipt.id);
            }}
            title="Delete"
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors text-xs"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Category badge */}
      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs self-start">
        <span>{categoryIcons[receipt.category as keyof typeof categoryIcons]}</span>
        <span>{receipt.category}</span>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-400">
        <span>
          <span className="text-gray-400 dark:text-gray-500">{t("store")}: </span>
          {receipt.store}
        </span>
        <span>
          <span className="text-gray-400 dark:text-gray-500">{t("price")}: </span>
          {formatCurrency(receipt.price, receipt.currency, language)}
        </span>
        <span>
          <span className="text-gray-400 dark:text-gray-500">{t("warrantyEnds")} </span>
          {receipt.warrantyEndDate
            ? formatDate(receipt.warrantyEndDate, language)
            : t("noWarranty")}
        </span>
      </div>

      {/* Status badge */}
      <div className="flex items-center gap-2 mt-auto">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeCls}`}>
          {status === "active" && t("warrantyActive")}
          {status === "soon" && t("warrantyExpiringSoon")}
          {status === "expired" && t("warrantyExpired")}
          {!status && t("noWarranty")}
        </span>
        {daysLeft !== null && status !== "expired" && (
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {t("daysLeft", { days: daysLeft })}
          </span>
        )}
      </div>
    </div>
  );
}
