import { useEffect, useState } from "react";
import { getReceipts } from "../services/receiptApi";
import type { ReadReceiptDto } from "../types/receipt";

export function useReceipts() {
  const [receipts, setReceipts] = useState<ReadReceiptDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getReceipts();
        if (!cancelled) setReceipts(data);
      } catch (e) {
        if (!cancelled) setError("Failed to load receipts (check API + CORS).");
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { receipts, loading, error };
}