import { useState } from "react";
import type { ReadReceiptDto } from "../types/receipt";
import { useTranslation } from "../i18n/useTranslation";
import { ReceiptCard } from "./ReceiptCard";
import { receiptCategories } from "../types/receiptCategory";

type Props = {
  receipts: ReadReceiptDto[];
};

export function ReceiptList({ receipts }: Props) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredReceipts =
    selectedCategory === "All"
      ? receipts
      : receipts.filter((r) => r.category === selectedCategory);

  if (receipts.length === 0) {
    return <p>{t("noReceipts")}</p>;
  }

  return (
    <div>

      {/* CATEGORY FILTER */}
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setSelectedCategory("All")}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #333",
            background: selectedCategory === "All" ? "#222" : "transparent",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          All
        </button>

        {receiptCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "1px solid #333",
              background:
                selectedCategory === category ? "#222" : "transparent",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* RECEIPT GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 12,
        }}
      >
        {filteredReceipts.map((receipt) => (
          <ReceiptCard key={receipt.id} receipt={receipt} />
        ))}
      </div>

    </div>
  );
}