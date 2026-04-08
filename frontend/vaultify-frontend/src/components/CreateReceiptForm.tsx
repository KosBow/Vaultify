import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import type { CreateReceiptDto, currency } from "../types/receipt";
import { useTranslation } from "../i18n/useTranslation";
import { receiptCategories } from "../types/receiptCategory";
import { uploadImage } from "../services/receiptApi";

type Props = {
  onCreate: (dto: CreateReceiptDto) => Promise<void>;
  isSaving?: boolean;
  error?: string | null;
};

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-colors";

const labelCls = "block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1";

export function CreateReceiptForm({ onCreate, isSaving = false, error = null }: Props) {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [store, setStore] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [currency, setCurrency] = useState<currency>("SEK");
  const [category, setCategory] = useState<string>("Electronics");
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().slice(0, 10));
  const [warrantyMonths, setWarrantyMonths] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]> | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  function clearErrors() {
    setFieldErrors(null);
    setLocalError(null);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    clearErrors();

    if (!title.trim()) return setLocalError(t("titleRequired"));
    if (!store.trim()) return setLocalError(t("storeRequired"));
    if (Number.isNaN(price) || price < 0.01) return setLocalError(t("priceInvalid"));
    if (Number.isNaN(warrantyMonths) || warrantyMonths < 0) return setLocalError(t("warrantyInvalid"));

    let imageURL: string | null = null;
    if (imageFile) {
      try {
        setIsUploading(true);
        imageURL = await uploadImage(imageFile);
      } catch {
        setLocalError("Failed to upload image. Try again or skip the image.");
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    const dto: CreateReceiptDto = {
      title: title.trim(),
      store: store.trim(),
      price,
      currency,
      category,
      purchaseDate,
      warrantyMonths,
      notes: null,
      imageURL,
    };

    try {
      await onCreate(dto);
      setTitle("");
      setStore("");
      setPrice(0);
      setCurrency("SEK");
      setPurchaseDate(new Date().toISOString().slice(0, 10));
      setWarrantyMonths(0);
      removeImage();
    } catch (err: unknown) {
      const apiError = err as { message?: string; errors?: Record<string, string[]> };
      if (apiError?.errors) {
        setFieldErrors(apiError.errors);
      } else {
        setLocalError(apiError?.message ?? t("createFailed"));
      }
    }
  }

  const busy = isSaving || isUploading;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {(localError || error) && (
        <p className="text-sm text-red-500 dark:text-red-400">{localError ?? error}</p>
      )}

      {/* Image upload */}
      <div>
        <label className={labelCls}>{t("receiptImageOptional")}</label>
        {imagePreview ? (
          <div className="relative w-full h-36 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 group">
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center text-sm transition-colors"
            >
              ×
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-24 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 flex flex-col items-center justify-center gap-1 text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors"
          >
            <ImagePlus size={20} strokeWidth={1.5} />
            <span className="text-xs">{t("clickToUpload")}</span>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>{t("title")}</label>
          <input
            required minLength={2} maxLength={100} disabled={busy}
            value={title} onChange={(e) => { setTitle(e.target.value); clearErrors(); }}
            className={`${inputCls} ${fieldErrors?.Title ? "border-red-500 dark:border-red-500" : ""}`}
          />
          {fieldErrors?.Title && <p className="text-xs text-red-500 mt-1">{fieldErrors.Title[0]}</p>}
        </div>

        <div>
          <label className={labelCls}>{t("store")}</label>
          <input
            required minLength={2} maxLength={100} disabled={busy}
            value={store} onChange={(e) => { setStore(e.target.value); clearErrors(); }}
            className={`${inputCls} ${fieldErrors?.Store ? "border-red-500 dark:border-red-500" : ""}`}
          />
          {fieldErrors?.Store && <p className="text-xs text-red-500 mt-1">{fieldErrors.Store[0]}</p>}
        </div>

        <div>
          <label className={labelCls}>{t("price")}</label>
          <input
            required type="number" min={0.01} step="0.01" disabled={busy}
            value={price} onChange={(e) => { setPrice(Number(e.target.value)); clearErrors(); }}
            className={`${inputCls} ${fieldErrors?.Price ? "border-red-500 dark:border-red-500" : ""}`}
          />
          {fieldErrors?.Price && <p className="text-xs text-red-500 mt-1">{fieldErrors.Price[0]}</p>}
        </div>

        <div>
          <label className={labelCls}>{t("currency")}</label>
          <select disabled={busy} value={currency} onChange={(e) => setCurrency(e.target.value as currency)} className={inputCls}>
            <option value="SEK">SEK</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <div>
          <label className={labelCls}>{t("purchaseDate")}</label>
          <input type="date" disabled={busy} value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>{t("category")}</label>
          <select disabled={busy} value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
            {receiptCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="col-span-2">
          <label className={labelCls}>{t("warrantyMonths")}</label>
          <input
            min={0} type="number" disabled={busy}
            value={warrantyMonths} onFocus={(e) => e.target.select()}
            onChange={(e) => { setWarrantyMonths(Number(e.target.value)); clearErrors(); }}
            className={`${inputCls} ${fieldErrors?.WarrantyMonths ? "border-red-500 dark:border-red-500" : ""}`}
          />
          {fieldErrors?.WarrantyMonths && <p className="text-xs text-red-500 mt-1">{fieldErrors.WarrantyMonths[0]}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors mt-1"
      >
        {isUploading ? t("uploadingImage") : busy ? t("saving") : t("create")}
      </button>
    </form>
  );
}
