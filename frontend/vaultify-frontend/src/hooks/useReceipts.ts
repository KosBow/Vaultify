import { useCallback, useEffect, useState } from "react";
import { createReceipt, getReceipts } from "../services/receiptApi";
import type { CreateReceiptDto, ReadReceiptDto } from "../types/receipt";

export function useReceipts() {
  const [receipts, setReceipts] = useState<ReadReceiptDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getReceipts();
      setReceipts(data);
    } catch (e) {
      setError("Failed to load receipts (check API + CORS).");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function initialLoad() {
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

    initialLoad();

    return () => {
      cancelled = true;
    };
  }, []);

  const create = useCallback(
    async (dto: CreateReceiptDto) => {
      try {
        setIsSaving(true);
        setSaveError(null);

        await createReceipt(dto);

        await reload();
      } catch (e) {
        setSaveError("Failed to create receipt.");
        console.error(e);
        throw e;
      } finally {
        setIsSaving(false);
      }
    },
    [reload],
  );

  return {
    receipts,
    loading,
    error,
    reload,
    create,
    isSaving,
    saveError,
  };
}
