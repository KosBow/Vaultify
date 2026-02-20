import { useEffect, useState } from "react";
import { getReceipts } from "./services/receiptApi";
import type { ReadReceiptDto } from "./types/receipt";
import { ReceiptList } from "./components/ReceiptList";
import { useTranslation } from "./i18n/useTranslation";
import { getReceiptSummary } from "./utils/receiptSummary";

function App() {
  const { t } = useTranslation();

  const [receipts, setReceipts] = useState<ReadReceiptDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getReceipts();
        console.log("Receipts from API:", data);
        setReceipts(data);
      } catch (e) {
        setError("Failed to load receipts (check API + CORS).");
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const summary = getReceiptSummary(receipts);

  return (
    <main style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>{t("appTitle")}</h1>

        <p style={{ marginTop: 6, opacity: 0.7 }}>
          Total: {summary.total} • Active: {summary.active} • Soon: {summary.soon} • Expired:{" "}
          {summary.expired}
        </p>
      </header>

      {loading && <p>Loading receipts...</p>}
      {error && <p style={{ color: "salmon" }}>{error}</p>}

      {!loading && !error && <ReceiptList receipts={receipts} />}
    </main>
  );
}

export default App;