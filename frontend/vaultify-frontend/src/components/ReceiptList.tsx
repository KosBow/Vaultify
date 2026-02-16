import type { ReadReceiptDto } from "../types/receipt";
import { useTranslation } from "../i18n/useTranslation";

type Props = {
  receipts: ReadReceiptDto[];
};

export function ReceiptList({ receipts }: Props) {
  const { t } = useTranslation();

  if (receipts.length === 0) {
    return <p>{t("noReceipts")}</p>;
  }

  return (
    <div>
      {receipts.map((receipt) => {
        const today = new Date();

        const warrantyDate = receipt.warrantyEndDate
          ? new Date(receipt.warrantyEndDate)
          : null;

        let warrantyStatus: "expired" | "soon" | "active" | null = null;
        let daysLeft: number | null = null;

        if (warrantyDate) {
          const diffInMs = warrantyDate.getTime() - today.getTime();
          const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
          daysLeft = diffInDays;

          if (diffInDays < 0) warrantyStatus = "expired";
          else if (diffInDays <= 90) warrantyStatus = "soon";
          else warrantyStatus = "active";
        }

        return (
          <div key={receipt.id} style={{ marginBottom: 16 }}>
            <h3>{receipt.title}</h3>

            <p>
              {t("store")}: {receipt.store}
            </p>

            <p>
              {t("price")}: {receipt.price} {receipt.currency}
            </p>

            <p>
              {t("warrantyEnds")}:{" "}
              {receipt.warrantyEndDate
                ? new Date(receipt.warrantyEndDate).toLocaleDateString("sv-SE")
                : t("noWarranty")}
            </p>

            {warrantyStatus === "expired" && (
              <p style={{ color: "red" }}>{t("warrantyExpired")}</p>
            )}

            {warrantyStatus === "soon" && daysLeft !== null && (
              <p style={{ color: "orange" }}>
                {t("warrantyExpiringSoon")} • {t("daysLeft", { days: daysLeft })}
              </p>
            )}

            {warrantyStatus === "active" && daysLeft !== null && (
              <p style={{ color: "green" }}>
                {t("warrantyActive")} • {t("daysLeft", { days: daysLeft })}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
