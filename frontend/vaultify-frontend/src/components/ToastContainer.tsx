import { CheckCircle2, XCircle, X } from "lucide-react";
import type { Toast } from "../hooks/useToast";

type Props = {
  toasts: Toast[];
  onDismiss: (id: number) => void;
};

export function ToastContainer({ toasts, onDismiss }: Props) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border pointer-events-auto animate-slide-in min-w-64 max-w-sm ${
            toast.type === "success"
              ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              : "bg-white dark:bg-gray-800 border-red-200 dark:border-red-800"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={16} strokeWidth={2} className="text-green-500 shrink-0" />
          ) : (
            <XCircle size={16} strokeWidth={2} className="text-red-500 shrink-0" />
          )}
          <p className="text-sm text-gray-800 dark:text-gray-200 flex-1">{toast.message}</p>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors shrink-0"
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>
      ))}
    </div>
  );
}