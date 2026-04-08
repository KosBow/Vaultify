import { useRef, useState } from "react";
import {
  LayoutDashboard, Settings, Plus, Search,
  Sun, Moon, Bell, Menu, X, CheckCircle2, Shield,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "../i18n/useTranslation";
import type { ReadReceiptDto } from "../types/receipt";
import { formatDate } from "../utils/format";
import { calculateWarranty } from "../utils/warranty";

export type AppView = "dashboard" | "settings";

type Props = {
  receiptCount: number;
  soonReceipts: ReadReceiptDto[];
  onAddReceipt: () => void;
  children: (view: AppView, searchQuery: string) => React.ReactNode;
};

export function AppShell({ receiptCount, soonReceipts, onAddReceipt, children }: Props) {
  const { theme, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useTranslation();
  const [view, setView] = useState<AppView>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

  function handleNav(v: AppView) {
    setView(v);
    setSidebarOpen(false);
  }

  function handleAddReceipt() {
    onAddReceipt();
    setSidebarOpen(false);
  }

  const navItem = (
    id: AppView,
    Icon: React.ElementType,
    label: string
  ) => (
    <button
      onClick={() => handleNav(id)}
      className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium text-left transition-all ${
        view === id
          ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
      }`}
    >
      <Icon size={16} strokeWidth={1.75} />
      {label}
    </button>
  );

  const sidebar = (
    <aside className="w-56 shrink-0 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <Shield size={16} strokeWidth={2} className="text-white" />
        </div>
        <div className="leading-tight min-w-0">
          <p className="font-bold text-sm tracking-tight">Vaultify</p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{t("tagline")}</p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1 p-3">
        {navItem("dashboard", LayoutDashboard, t("dashboard"))}
        {navItem("settings", Settings, t("settings"))}

        <button
          onClick={handleAddReceipt}
          className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-semibold text-left mt-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white transition-all"
        >
          <Plus size={16} strokeWidth={2.5} />
          {t("addReceipt")}
        </button>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">{t("storage")}</p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-1">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((receiptCount / 50) * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-400">{t("receiptsStored", { count: receiptCount })}</p>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden">
      <div className="hidden md:flex">{sidebar}</div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="shrink-0 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 md:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Menu size={18} />
            </button>
            <h1 className="font-semibold text-sm">
              {view === "dashboard" ? t("dashboard") : t("settings")}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {view === "dashboard" && (
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="pl-7 pr-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-36 sm:w-52 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                />
              </div>
            )}

            <div className="relative" ref={bellRef}>
              <button
                onClick={() => setShowNotifications((v) => !v)}
                title={t("notifications")}
                className="relative w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Bell size={17} strokeWidth={1.75} />
                {soonReceipts.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>

              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-20 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <p className="text-sm font-semibold">{t("notifications")}</p>
                      {soonReceipts.length > 0 && (
                        <span className="text-xs bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded-full font-medium">
                          {t("expiringCount", { count: soonReceipts.length })}
                        </span>
                      )}
                    </div>

                    {soonReceipts.length === 0 ? (
                      <div className="px-4 py-8 flex flex-col items-center gap-2">
                        <CheckCircle2 size={28} className="text-green-500" strokeWidth={1.5} />
                        <p className="text-sm text-gray-500 dark:text-gray-400">{t("allWarrantiesGood")}</p>
                      </div>
                    ) : (
                      <ul className="max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                        {soonReceipts.map((r) => {
                          const { daysLeft } = calculateWarranty(r.warrantyEndDate);
                          return (
                            <li key={r.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{r.title}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                    {r.warrantyEndDate ? formatDate(r.warrantyEndDate, language) : ""}
                                  </p>
                                </div>
                                <span className="shrink-0 text-xs font-semibold text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-0.5 rounded-full whitespace-nowrap">
                                  {daysLeft !== null ? t("daysLeftShort", { days: daysLeft }) : ""}
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={toggleTheme}
              title={t("toggleTheme")}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === "dark"
                ? <Sun size={17} strokeWidth={1.75} />
                : <Moon size={17} strokeWidth={1.75} />
              }
            </button>

            <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              {(["en", "sv"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                    language === lang
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children(view, searchQuery)}
        </main>
      </div>
    </div>
  );
}
