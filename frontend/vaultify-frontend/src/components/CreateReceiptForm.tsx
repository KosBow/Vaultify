import { useState } from "react";
import type { CreateReceiptDto, currency } from "../types/receipt";
import { useTranslation } from "../i18n/useTranslation";
import { receiptCategories } from "../types/receiptCategory";

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
  const [category, setCategory] = useState<string>("General");

  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [warrantyMonths, setWarrantyMonths] = useState<number>(0);

  const [localError, setLocalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  function clearErrors() {
    setFieldErrors(null);
    setLocalError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearErrors();

    if (!title.trim()) return setLocalError(t("titleRequired"));
    if (!store.trim()) return setLocalError(t("storeRequired"));
    if (Number.isNaN(price) || price < 0.01)
      return setLocalError(t("priceInvalid"));
    if (Number.isNaN(warrantyMonths) || warrantyMonths < 0)
      return setLocalError(t("warrantyInvalid"));

    const dto: CreateReceiptDto = {
      title: title.trim(),
      store: store.trim(),
      price,
      currency,
      category,
      purchaseDate,
      warrantyMonths,
      notes: null,
      imageURL: null,
    };

    try {
      await onCreate(dto);

      setTitle("");
      setStore("");
      setPrice(0);
      setCurrency("SEK");
      setPurchaseDate(new Date().toISOString().slice(0, 10));
      setWarrantyMonths(0);
    } catch (err: unknown) {
      const apiError = err as {
        message?: string;
        errors?: Record<string, string[]>;
      };

      if (apiError?.errors) {
        setFieldErrors(apiError.errors);
      } else {
        setLocalError(apiError?.message ?? t("createFailed"));
      }
    }
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
        style={{
          marginTop: 0,
          marginBottom: 12,
          fontSize: 16,
          opacity: 0.9,
        }}
      >
        {t("createReceipt")}
      </h2>

      {(localError || error) && (
        <p style={{ color: "salmon", marginTop: 0 }}>{localError ?? error}</p>
      )}

      <div
        style={{
          display: "grid",
          gap: 10,
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <label style={{ display: "grid", gap: 6 }}>
          <span>{t("title")}</span>

          <input
            required
            minLength={2}
            maxLength={100}
            disabled={isSaving}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              clearErrors();
            }}
            style={{
              padding: 10,
              borderRadius: 8,
              border: fieldErrors?.Title
                ? "1px solid salmon"
                : "1px solid #333",
              background: "transparent",
              color: "inherit",
            }}
          />

          {fieldErrors?.Title && (
            <span style={{ color: "salmon", fontSize: 12 }}>
              {fieldErrors.Title[0]}
            </span>
          )}
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>{t("store")}</span>

          <input
            required
            minLength={2}
            maxLength={100}
            disabled={isSaving}
            value={store}
            onChange={(e) => {
              setStore(e.target.value);
              clearErrors();
            }}
            style={{
              padding: 10,
              borderRadius: 8,
              border: fieldErrors?.Store
                ? "1px solid salmon"
                : "1px solid #333",
              background: "transparent",
              color: "inherit",
            }}
          />

          {fieldErrors?.Store && (
            <span style={{ color: "salmon", fontSize: 12 }}>
              {fieldErrors.Store[0]}
            </span>
          )}
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>{t("price")}</span>

          <input
            required
            type="number"
            min={0.01}
            step="0.01"
            disabled={isSaving}
            value={price}
            onChange={(e) => {
              setPrice(Number(e.target.value));
              clearErrors();
            }}
            style={{
              padding: 10,
              borderRadius: 8,
              border: fieldErrors?.Price
                ? "1px solid salmon"
                : "1px solid #333",
              background: "transparent",
              color: "inherit",
            }}
          />

          {fieldErrors?.Price && (
            <span style={{ color: "salmon", fontSize: 12 }}>
              {fieldErrors.Price[0]}
            </span>
          )}
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>{t("currency")}</span>

          <select
            disabled={isSaving}
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
          <span>{t("purchaseDate")}</span>

          <input
            type="date"
            disabled={isSaving}
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
  <span>Category</span>

  <select
    disabled={isSaving}
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    style={{
      padding: 10,
      borderRadius: 8,
      border: "1px solid #333",
      background: "transparent",
      color: "inherit",
    }}
  >
    {receiptCategories.map((c) => (
      <option key={c} value={c}>
        {c}
      </option>
    ))}
  </select>
</label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>{t("warrantyMonths")}</span>

          <input
            min={0}
            type="number"
            disabled={isSaving}
            value={warrantyMonths}
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              setWarrantyMonths(Number(e.target.value));
              clearErrors();
            }}
            style={{
              padding: 10,
              borderRadius: 8,
              border: fieldErrors?.WarrantyMonths
                ? "1px solid salmon"
                : "1px solid #333",
              background: "transparent",
              color: "inherit",
            }}
          />

          {fieldErrors?.WarrantyMonths && (
            <span style={{ color: "salmon", fontSize: 12 }}>
              {fieldErrors.WarrantyMonths[0]}
            </span>
          )}
        </label>
      </div>

      <div style={{ marginTop: 12 }}>
        <button
          type="submit"
          disabled={isSaving}
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #333",
            background: isSaving ? "#222" : "transparent",
            color: "inherit",
            cursor: isSaving ? "not-allowed" : "pointer",
          }}
        >
          {isSaving ? t("saving") : t("create")}
        </button>
      </div>
    </form>
  );
}
