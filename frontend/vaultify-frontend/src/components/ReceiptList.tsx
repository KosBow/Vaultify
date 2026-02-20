import type { ReadReceiptDto } from "../types/receipt";
import { useTranslation } from "../i18n/useTranslation";
import { ReceiptCard } from "./ReceiptCard";

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
      {receipts.map((receipt) => (
        <ReceiptCard key={receipt.id} receipt={receipt} />
      ))}
    </div>
  );
}