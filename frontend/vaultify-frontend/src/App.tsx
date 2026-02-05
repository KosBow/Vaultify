import { useEffect, useState } from "react";
import { getReceipts } from "./services/receiptApi";
import type { ReadReceiptDto } from "./types/receipt";

function App() {
  const [receipts, setReceipts] = useState<ReadReceiptDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getReceipts()
      .then(setReceipts)
      .catch((e) => {
        setError("Failed to load receipts (check API + CORS).");
        console.error(e);
      });
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Vaultify</h1>

      {error && <p>{error}</p>}

      <pre>{JSON.stringify(receipts, null, 2)}</pre>
    </main>
  );
}

export default App;
