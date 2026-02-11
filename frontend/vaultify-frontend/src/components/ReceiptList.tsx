import type { ReadReceiptDto } from "../types/receipt";

interface props {
    receipts: ReadReceiptDto[];
}

export function ReceiptList({ receipts }: props) {
    if (receipts.length === 0) {
        return <p>No receipts found.</p>;
    }


return (
    <div>
        {receipts.map((receipt) => (
            <div key={receipt.id} style={{marginBottom: 16}} >
                <h3>{receipt.title}</h3>
                <p>Store: {receipt.store}</p>
                <p>Price: {receipt.price} {receipt.currency}</p>
                <p>Warranty ends: {receipt.warrantyEndDate ?? "No warranty"}</p>
            </div>
        ))}
    </div>
);
}