export type currency = "SEK" | "EUR" | "USD";

export interface ReadReceiptDto {
    id: string;
    title: string;
    store: string;
    price: number;
    currency: currency;
    category: string;
    purchaseDate: string;
    warrantyMonths: number;
    warrantyEndDate: string | null;
    notes: string | null;
    imageURL: string | null;
}

export interface CreateReceiptDto {
    title: string;
    store: string;
    price: number;
    currency: currency;
    category: string;
    purchaseDate: string;
    warrantyMonths: number;
    notes?: string | null;
    imageURL: string | null;
}

export type UpdateReceiptDto = CreateReceiptDto;