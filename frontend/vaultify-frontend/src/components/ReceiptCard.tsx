import type { ReadReceiptDto } from "../types/receipt";
import { useTranslation } from "../i18n/useTranslation";
import { calculateWarranty } from "../utils/warranty";
import { StatusBadge } from "./statusbadge";
import { formatCurrency, formatDate } from "../utils/format";

type Props = {
  receipt: ReadReceiptDto;
};

export function ReceiptCard({ receipt }: Props) {
  const { t, language } = useTranslation();

  const { status, daysLeft } = calculateWarranty(receipt.warrantyEndDate);

  return (
    <div style={{ marginBottom: 16, padding: 16, borderRadius: 10, border: "1px solid #333" }}>
      <h3 style={{ marginTop: 0 }}>{receipt.title}</h3>

      <p>
        {t("store")}: {receipt.store}
      </p>

      <p>
        {t("price")}: {formatCurrency(receipt.price, receipt.currency, language)}
      </p>

      <p>
        {t("warrantyEnds")}:{" "}
        {receipt.warrantyEndDate ? formatDate(receipt.warrantyEndDate, language) : t("noWarranty")}
      </p>

      {status === "expired" && <StatusBadge status="expired" text={t("warrantyExpired")} />}

      {status === "soon" && daysLeft !== null && (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <StatusBadge status="soon" text={t("warrantyExpiringSoon")} />
          <span style={{ opacity: 0.9 }}>{t("daysLeft", { days: daysLeft })}</span>
        </div>
      )}

      {status === "active" && daysLeft !== null && (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <StatusBadge status="active" text={t("warrantyActive")} />
          <span style={{ opacity: 0.9 }}>{t("daysLeft", { days: daysLeft })}</span>
        </div>
      )}
    </div>
  );
}