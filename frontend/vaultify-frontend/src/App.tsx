import { useMemo, useState } from "react";
import { ReceiptList } from "./components/ReceiptList";
import { useTranslation } from "./i18n/useTranslation";
import { getReceiptSummary } from "./utils/receiptSummary";
import { calculateWarranty } from "./utils/warranty";
import { useReceipts } from "./hooks/useReceipts";
import { sortByWarrantyEndDateSoonestFirst } from "./utils/receiptSorting";
import { CreateReceiptForm } from "./components/CreateReceiptForm";

type Filter = "all" | "active" | "soon" | "expired";

function App() {
  const { t, language, setLanguage } = useTranslation();
  const { receipts, loading, error, create, isSaving, saveError } = useReceipts();

  const [filter, setFilter] = useState<Filter>("all");

  const summary = getReceiptSummary(receipts);

const filteredReceipts = useMemo(() => {
  const list =
    filter === "all"
      ? receipts
      : receipts.filter(
          (r) => calculateWarranty(r.warrantyEndDate).status === filter
        );

  return sortByWarrantyEndDateSoonestFirst(list);
}, [receipts, filter]);

  return (
    <main style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>{t("appTitle")}</h1>

<div style={{ display: "flex", gap: 8, marginTop: 10 }}>
    <button
      onClick={() => setLanguage("sv")}
      style={{
        padding: "6px 10px",
        borderRadius: 8,
        border: "1px solid #333",
        background: language === "sv" ? "#222" : "transparent",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      SV
    </button>

    <button
      onClick={() => setLanguage("en")}
      style={{
        padding: "6px 10px",
        borderRadius: 8,
        border: "1px solid #333",
        background: language === "en" ? "#222" : "transparent",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      EN
    </button>
  </div>

        <p style={{ marginTop: 6, opacity: 0.7 }}>
          Total: {summary.total} • Active: {summary.active} • Soon: {summary.soon} • Expired:{" "}
          {summary.expired}
        </p>

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          {(["all", "active", "soon", "expired"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #333",
                background: filter === f ? "#222" : "transparent",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </header>
        <CreateReceiptForm onCreate={create} isSaving={isSaving} error={saveError} />

      {loading && <p>Loading receipts...</p>}
      {error && <p style={{ color: "salmon" }}>{error}</p>}

      {!loading && !error && <ReceiptList receipts={filteredReceipts} />}
    </main>
  );
}

export default App;