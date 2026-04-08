import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "../i18n/useTranslation";

export type AppView = "dashboard" | "settings";

type Props = {
  receiptCount: number;
  onAddReceipt: () => void;
  children: (view: AppView, searchQuery: string) => React.ReactNode;
};

export function AppShell({ receiptCount, onAddReceipt, children }: Props) {
  const { theme, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useTranslation();
  const [view, setView] = useState<AppView>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleNav(v: AppView) {
    setView(v);
    setSidebarOpen(false);
  }

  function handleAddReceipt() {
    onAddReceipt();
    setSidebarOpen(false);
  }

  const sidebar = (
    <aside className="w-56 shrink-0 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          V
        </div>
        <div className="leading-tight">
          <p className="font-semibold text-sm">Vaultify</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t("warrantyTracker")}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1 p-3">
        <button
          onClick={() => handleNav("dashboard")}
          className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ${
            view === "dashboard"
              ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <span>⊞</span>
          {t("dashboard")}
        </button>

        <button
          onClick={() => handleNav("settings")}
          className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ${
            view === "settings"
              ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <span>⚙</span>
          {t("settings")}
        </button>

        <button
          onClick={handleAddReceipt}
          className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-semibold text-left mt-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          <span className="font-bold">+</span>
          {t("addReceipt")}
        </button>
      </nav>

      {/* Storage */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">{t("storage")}</p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-1">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((receiptCount / 50) * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-400">{t("receiptsStored", { count: receiptCount })}</p>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden">

      {/* Desktop sidebar */}
      <div className="hidden md:flex">{sidebar}</div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="shrink-0 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 md:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              ☰
            </button>
            <h1 className="font-semibold text-sm">
              {view === "dashboard" ? t("dashboard") : t("settings")}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {view === "dashboard" && (
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">
                  🔍
                </span>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="pl-7 pr-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-36 sm:w-52 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            )}

            <button
              onClick={toggleTheme}
              title={t("toggleTheme")}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === "dark" ? "☀️" : "🌙"}
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

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children(view, searchQuery)}
        </main>
      </div>
    </div>
  );
}
