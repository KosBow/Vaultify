import { useCallback, useEffect, useState } from "react";
import {
  createReceipt,
  getReceipts,
  updateReceipt,
  deleteReceipt,
} from "../services/receiptApi";
import type {
  CreateReceiptDto,
  ReadReceiptDto,
  UpdateReceiptDto,
} from "../types/receipt";

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
        if (!cancelled)
          setError("Failed to load receipts (check API + CORS).");
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
    [reload]
  );

  const update = useCallback(
    async (id: string, dto: UpdateReceiptDto) => {
      try {
        setIsSaving(true);
        setSaveError(null);
        await updateReceipt(id, dto);
        await reload();
      } catch (e) {
        setSaveError("Failed to update receipt.");
        console.error(e);
        throw e;
      } finally {
        setIsSaving(false);
      }
    },
    [reload]
  );

  const remove = useCallback(
    async (id: string) => {
      try {
        await deleteReceipt(id);
        setReceipts((prev) => prev.filter((r) => r.id !== id));
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    []
  );

  return {
    receipts,
    loading,
    error,
    reload,
    create,
    update, 
    remove,   
    isSaving,
    saveError,
  };
}