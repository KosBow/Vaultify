import { useEffect, useState } from "react";
import { getReceipts } from "./services/receiptApi";
import type { ReadReceiptDto } from "./types/receipt";
import { ReceiptList } from "./components/ReceiptList";

function App() {
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

  return (
    <main style={{ padding: 24 }}>
      <h1>Vaultify</h1>

      {loading && <p>Loading receipts...</p>}
      {error && <p style={{ color: "salmon" }}>{error}</p>}

{!loading && !error && <ReceiptList receipts={receipts} />}
    </main>
  );
}

export default App;
