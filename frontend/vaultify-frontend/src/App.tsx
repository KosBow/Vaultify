import { useState } from "react";
import { Receipt, SearchX, Plus, FileText, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { ReceiptList } from "./components/ReceiptList";
import { useTranslation } from "./i18n/useTranslation";
import { getReceiptSummary } from "./utils/receiptSummary";
import { calculateWarranty } from "./utils/warranty";
import { useReceipts } from "./hooks/useReceipts";
import { sortReceipts } from "./utils/receiptSorting";
import type { SortOption } from "./utils/receiptSorting";
import { CreateReceiptForm } from "./components/CreateReceiptForm";
import { AppShell } from "./components/AppShell";
import type { AppView } from "./components/AppShell";
import { SettingsView } from "./components/SettingsView";
import { ToastContainer } from "./components/ToastContainer";
import { useToast } from "./hooks/useToast";

type Filter = "all" | "active" | "soon" | "expired";

function App() {
  const { t } = useTranslation();
  const { receipts, loading, error, create, update, remove, isSaving, saveError } = useReceipts();
  const { toasts, show: showToast, dismiss } = useToast();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<SortOption>("warranty-asc");

  const summary = getReceiptSummary(receipts);
  const soonReceipts = receipts.filter(
    (r) => calculateWarranty(r.warrantyEndDate).status === "soon"
  );

  const filterLabels: Record<Filter, string> = {
    all:     t("filterAll"),
    active:  t("filterActive"),
    soon:    t("filterSoon"),
    expired: t("filterExpired"),
  };

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "warranty-asc", label: t("sortWarrantyAsc") },
    { value: "date-desc",    label: t("sortDateDesc") },
    { value: "price-desc",   label: t("sortPriceDesc") },
    { value: "price-asc",    label: t("sortPriceAsc") },
  ];

  const statCards = [
    { label: t("summaryTotal"),   value: summary.total,   color: "text-blue-600 dark:text-blue-400",    bg: "bg-blue-50 dark:bg-blue-950",    icon: FileText },
    { label: t("summaryActive"),  value: summary.active,  color: "text-green-600 dark:text-green-400",  bg: "bg-green-50 dark:bg-green-950",  icon: CheckCircle2 },
    { label: t("summarySoon"),    value: summary.soon,    color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-950", icon: Clock },
    { label: t("summaryExpired"), value: summary.expired, color: "text-red-600 dark:text-red-400",      bg: "bg-red-50 dark:bg-red-950",      icon: AlertTriangle },
  ];

  async function handleCreate(dto: Parameters<typeof create>[0]) {
    await create(dto);
    setShowCreateModal(false);
    showToast(t("toastCreated"), "success");
  }

  async function handleUpdate(id: string, dto: Parameters<typeof update>[1]) {
    await update(id, dto);
    showToast(t("toastSaved"), "success");
  }

  async function handleDelete(id: string) {
    await remove(id);
    showToast(t("toastDeleted"), "success");
  }

  function getDisplayedReceipts(searchQuery: string) {
    const q = searchQuery.toLowerCase().trim();

    let list =
      filter === "all"
        ? receipts
        : receipts.filter((r) => calculateWarranty(r.warrantyEndDate).status === filter);

    if (q) {
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.store.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      );
    }

    return sortReceipts(list, sort);
  }

  function renderContent(view: AppView, searchQuery: string) {
    if (view === "settings") return <SettingsView />;

    if (loading) {
      return <p className="text-sm text-gray-500 dark:text-gray-400">{t("loadingReceipts")}</p>;
    }

    if (error) {
      return <p className="text-sm text-red-400">{error}</p>;
    }

    if (receipts.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center mb-5">
            <Receipt size={36} strokeWidth={1.25} className="text-blue-400 dark:text-blue-500" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {t("noReceiptsYet")}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-xs">
            {t("noReceiptsYetDesc")}
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
          >
            <Plus size={16} strokeWidth={2.5} /> {t("addReceipt")}
          </button>
        </div>
      );
    }

    const displayed = getDisplayedReceipts(searchQuery);

    return (
      <div className="space-y-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className={`rounded-xl p-4 ${card.bg}`}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 bg-white/60 dark:bg-black/20">
                  <Icon size={18} strokeWidth={1.75} className={card.color} />
                </div>
                <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{card.label}</p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-2 flex-wrap">
            {(["all", "active", "soon", "expired"] as const).map((f) => {
              const count = f === "all" ? summary.total : summary[f as keyof typeof summary];
              return (
                <button
                  key={f}
                  onClick={() => setFilter(filter === f && f !== "all" ? "all" : f)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                    filter === f
                      ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-900 dark:border-gray-100"
                      : "text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {filterLabels[f]}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                    filter === f
                      ? "bg-white/20 dark:bg-black/20"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <SearchX size={24} strokeWidth={1.5} className="text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("noResults")}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">{t("noResultsDesc")}</p>
          </div>
        ) : (
          <ReceiptList
            receipts={displayed}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            isSaving={isSaving}
          />
        )}
      </div>
    );
  }

  return (
    <>
      <AppShell receiptCount={receipts.length} soonReceipts={soonReceipts} onAddReceipt={() => setShowCreateModal(true)}>
        {renderContent}
      </AppShell>

      {showCreateModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowCreateModal(false); }}
        >
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-600">
              <h2 className="font-semibold">{t("addReceipt")}</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="p-5">
              <CreateReceiptForm
                onCreate={handleCreate}
                isSaving={isSaving}
                error={saveError}
              />
            </div>
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </>
  );
}

export default App;