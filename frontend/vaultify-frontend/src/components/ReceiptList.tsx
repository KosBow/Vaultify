import { useState } from "react";
import type { ReadReceiptDto } from "../types/receipt";
import { useTranslation } from "../i18n/useTranslation";
import { ReceiptCard } from "./ReceiptCard";
import { EditReceiptModal } from "./EditReceiptModal";
import { receiptCategories, categoryIcons, getCategoryLabel } from "../types/receiptCategory";
import type { ReceiptCategory } from "../types/receiptCategory";
import type { UpdateReceiptDto } from "../types/receipt";

type Props = {
  receipts: ReadReceiptDto[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, dto: UpdateReceiptDto) => Promise<void>;
  isSaving: boolean;
};

export function ReceiptList({ receipts, onDelete, onUpdate, isSaving }: Props) {
  const { t, language } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<ReceiptCategory | "All">("All");
  const [editingReceipt, setEditingReceipt] = useState<ReadReceiptDto | null>(null);

  const filtered =
    selectedCategory === "All"
      ? receipts
      : receipts.filter((r) => r.category === selectedCategory);

  if (receipts.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">{t("noReceipts")}</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
            onClick={() => setSelectedCategory("All")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors border ${
              selectedCategory === "All"
                ? "bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-800 dark:border-gray-100"
                : "text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {t("allCategories")}
          </button>
          {receiptCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? "All" : cat)}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-colors border ${
              selectedCategory === cat
                ? "bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-800 dark:border-gray-100"
                : "text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <span>{categoryIcons[cat]}</span>
            {getCategoryLabel(cat, language)}
          </button>
        ))}
      </div>

      {/* Receipt grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((receipt) => (
          <ReceiptCard
            key={receipt.id}
            receipt={receipt}
            onDelete={onDelete}
            onEdit={setEditingReceipt}
          />
        ))}
      </div>

      {editingReceipt && (
        <EditReceiptModal
          receipt={editingReceipt}
          onSave={onUpdate}
          onClose={() => setEditingReceipt(null)}
          isSaving={isSaving}
        />
      )}
    </div>
  );
}
