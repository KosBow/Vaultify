import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import type { ReadReceiptDto, UpdateReceiptDto } from "../types/receipt";
import { receiptCategories, getCategoryLabel } from "../types/receiptCategory";
import { useTranslation } from "../i18n/useTranslation";
import { uploadImage } from "../services/receiptApi";

type Props = {
  receipt: ReadReceiptDto;
  onSave: (id: string, dto: UpdateReceiptDto) => Promise<void>;
  onClose: () => void;
  isSaving: boolean;
};

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-colors";

export function EditReceiptModal({ receipt, onSave, onClose, isSaving }: Props) {
  const { t, language } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<UpdateReceiptDto>({
    title: receipt.title,
    store: receipt.store,
    price: receipt.price,
    currency: receipt.currency,
    category: receipt.category,
    purchaseDate: receipt.purchaseDate.slice(0, 10),
    warrantyMonths: receipt.warrantyMonths,
    notes: receipt.notes ?? "",
    imageURL: receipt.imageURL ?? null,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(receipt.imageURL ?? null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "warrantyMonths" ? Number(value) : value,
    }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
    setForm((prev) => ({ ...prev, imageURL: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    setError(null);

    let imageURL = form.imageURL;
    if (imageFile) {
      try {
        setIsUploading(true);
        imageURL = await uploadImage(imageFile);
      } catch {
        setError(t("imageUploadFailed"));
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    try {
      await onSave(receipt.id, { ...form, imageURL });
      onClose();
    } catch {
      setError(t("saveFailed"));
    }
  }

  const busy = isSaving || isUploading;
  const labelCls = "block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1";

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-600">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">{t("editReceipt")}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-xl leading-none">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}

          {/* Image */}
          <div>
            <label className={labelCls}>{t("receiptImage")}</label>
            {imagePreview ? (
              <div className="relative w-full h-36 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
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
                className="w-full h-20 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 flex items-center justify-center gap-2 text-gray-400 hover:text-blue-500 transition-colors text-sm"
              >
                <ImagePlus size={16} strokeWidth={1.5} /> {t("uploadImage")}
              </button>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>{t("title")}</label>
              <input name="title" value={form.title} onChange={handleChange} required className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>{t("store")}</label>
              <input name="store" value={form.store} onChange={handleChange} required className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>{t("price")}</label>
              <input name="price" type="number" min={0.01} step={0.01} value={form.price} onChange={handleChange} required className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>{t("currency")}</label>
              <select name="currency" value={form.currency} onChange={handleChange} className={inputCls}>
                <option value="SEK">SEK</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>{t("category")}</label>
              <select name="category" value={form.category} onChange={handleChange} className={inputCls}>
                {receiptCategories.map((c) => <option key={c} value={c}>{getCategoryLabel(c, language)}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>{t("purchaseDate")}</label>
              <input name="purchaseDate" type="date" value={form.purchaseDate} onChange={handleChange} required className={inputCls} />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>{t("warrantyMonths")}</label>
              <input name="warrantyMonths" type="number" min={0} value={form.warrantyMonths} onChange={handleChange} className={inputCls} />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>{t("notes")}</label>
              <textarea name="notes" value={form.notes ?? ""} onChange={handleChange} rows={3} className={`${inputCls} resize-none`} />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-1">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              {t("cancel")}
            </button>
            <button type="submit" disabled={busy} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors">
              {isUploading ? t("uploadingImage") : busy ? t("saving") : t("saveChanges")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
