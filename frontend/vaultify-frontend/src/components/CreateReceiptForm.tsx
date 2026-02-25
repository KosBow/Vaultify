import { useState } from "react";
import type { CreateReceiptDto, currency } from "../types/receipt";
import { useTranslation } from "../i18n/useTranslation";

type Props = {
  onCreate: (dto: CreateReceiptDto) => Promise<void>;
  isSaving?: boolean;
  error?: string | null;
};

export function CreateReceiptForm({
  onCreate,
  isSaving = false,
  error = null,
}: Props) {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [store, setStore] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [currency, setCurrency] = useState<currency>("SEK");
  const [purchaseDate, setPurchaseDate] = useState(() =>
    new Date().toISOString().slice(0, 10),
  );
  const [warrantyMonths, setWarrantyMonths] = useState<number>(0);

  const [localError, setLocalError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError(null);

    if (!title.trim()) return setLocalError("Title is required.");
    if (!store.trim()) return setLocalError("Store is required.");
    if (Number.isNaN(price) || price < 0)
      return setLocalError("Price must be 0 or more.");
    if (Number.isNaN(warrantyMonths) || warrantyMonths < 0)
      return setLocalError("Warranty months must be 0 or more.");

    const dto: CreateReceiptDto = {
      title: title.trim(),
      store: store.trim(),
      price,
      currency,
      category: "General",
      purchaseDate: new Date(purchaseDate).toISOString(),
      warrantyMonths,
      notes: null,
      imageURL: null,
    };

    await onCreate(dto);

    setTitle("");
    setStore("");
    setPrice(0);
    setCurrency("SEK");
    setPurchaseDate(new Date().toISOString().slice(0, 10));
    setWarrantyMonths(0);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #333",
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
      }}
    >
      <h2
        style={{ marginTop: 0, marginBottom: 12, fontSize: 16, opacity: 0.9 }}
      >
        Create receipt
      </h2>

      {(localError || error) && (
        <p style={{ color: "salmon", marginTop: 0 }}>{localError ?? error}</p>
      )}

      <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid #333",
              background: "transparent",
              color: "inherit",
            }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>{t("store")}</span>
          <input
            value={store}
            onChange={(e) => setStore(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid #333",
              background: "transparent",
              color: "inherit",
            }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>{t("price")}</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid #333",
              background: "transparent",
              color: "inherit",
            }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Currency</span>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as currency)}
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid #333",
              background: "transparent",
              color: "inherit",
            }}
          >
            <option value="SEK">SEK</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Purchase date</span>
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid #333",
              background: "transparent",
              color: "inherit",
            }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Warranty months</span>
          <input
            type="number"
            value={warrantyMonths}
            onChange={(e) => setWarrantyMonths(Number(e.target.value))}
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid #333",
              background: "transparent",
              color: "inherit",
            }}
          />
        </label>
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
        <button
          type="submit"
          disabled={isSaving}
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #333",
            background: isSaving ? "#222" : "transparent",
            color: "inherit",
            cursor: isSaving ? "not-allowed" : "pointer",
          }}
        >
          {isSaving ? "Saving..." : "Create"}
        </button>
      </div>
    </form>
  );
}
