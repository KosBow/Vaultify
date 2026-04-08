import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "../i18n/useTranslation";

export function SettingsView() {
  const { theme, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useTranslation();

  return (
    <div className="max-w-lg space-y-4">
      <h2 className="text-lg font-semibold">{t("settings")}</h2>

      <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t("appearance")}</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{t("theme")}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {theme === "dark" ? t("darkModeOn") : t("lightModeOn")}
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
              theme === "dark" ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                theme === "dark" ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t("language")}</h3>
        <div className="flex gap-3">
          {(["en", "sv"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                language === lang
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
              }`}
            >
              {lang === "en" ? "🇬🇧 English" : "🇸🇪 Svenska"}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 space-y-2">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t("about")}</h3>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">App</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">Vaultify</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Version</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">1.0.0</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Stack</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">React · .NET · MongoDB</span>
        </div>
      </section>
    </div>
  );
}
