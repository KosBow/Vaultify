import { useState } from "react";
import { Pencil, Trash2, Calendar, Building2, Clock, Check, X } from "lucide-react";
import type { ReadReceiptDto } from "../types/receipt";
import { useTranslation } from "../i18n/useTranslation";
import { calculateWarranty } from "../utils/warranty";
import { formatCurrency, formatDate } from "../utils/format";
import { categoryIcons, getCategoryLabel, type ReceiptCategory } from "../types/receiptCategory";

type Props = {
  receipt: ReadReceiptDto;
  onDelete: (id: string) => void;
  onEdit: (receipt: ReadReceiptDto) => void;
};

const statusBadge: Record<string, string> = {
  active:  "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400",
  soon:    "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400",
  expired: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400",
  none:    "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
};

export function ReceiptCard({ receipt, onDelete, onEdit }: Props) {
  const { t, language } = useTranslation();
  const [confirming, setConfirming] = useState(false);

  const { status, daysLeft } = calculateWarranty(receipt.warrantyEndDate);
  const badgeCls = statusBadge[status ?? "none"];

  const statusLabel = (() => {
    if (status === "active" && daysLeft !== null) return t("daysLeftShort", { days: daysLeft });
    if (status === "soon") return t("warrantyExpiringSoon");
    if (status === "expired") return t("warrantyExpired");
    return t("noWarranty");
  })();

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      {receipt.imageURL && (
        <div className="w-full h-36 bg-gray-100 dark:bg-gray-700 shrink-0">
          <img src={receipt.imageURL} alt={receipt.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 leading-snug">
            {receipt.title}
          </h3>
          <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${badgeCls}`}>
            {statusLabel}
          </span>
        </div>

        <div className="flex flex-col gap-1.5 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Building2 size={13} strokeWidth={1.75} className="text-gray-400 dark:text-gray-500 shrink-0" />
            <span>{receipt.store}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={13} strokeWidth={1.75} className="text-gray-400 dark:text-gray-500 shrink-0" />
            <span>
              <span className="text-gray-400 dark:text-gray-500 text-xs">{t("purchaseDate")}: </span>
              {formatDate(receipt.purchaseDate, language)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={13} strokeWidth={1.75} className="text-gray-400 dark:text-gray-500 shrink-0" />
            <span>
              <span className="text-gray-400 dark:text-gray-500 text-xs">{t("warrantyEnds")}: </span>
              {receipt.warrantyEndDate ? formatDate(receipt.warrantyEndDate, language) : t("noWarranty")}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-auto">
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs">
            <span>{categoryIcons[receipt.category as ReceiptCategory]}</span>
            <span>{getCategoryLabel(receipt.category as ReceiptCategory, language)}</span>
          </div>

          {confirming ? (
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500 dark:text-gray-400">{t("confirmDelete")}</span>
              <button
                onClick={() => onDelete(receipt.id)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                <Check size={13} strokeWidth={2.5} />
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X size={13} strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {formatCurrency(receipt.price, receipt.currency, language)}
              </span>
              <button
                onClick={() => onEdit(receipt)}
                title={t("editReceipt")}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Pencil size={13} strokeWidth={1.75} />
              </button>
              <button
                onClick={() => setConfirming(true)}
                title={t("deleteReceipt")}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
              >
                <Trash2 size={13} strokeWidth={1.75} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}