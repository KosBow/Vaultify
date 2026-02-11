import { http } from "./httpClient";
import type { ReadReceiptDto, CreateReceiptDto, UpdateReceiptDto } from "../types/receipt";

export async function getReceipts() {
    const res = await http.get<ReadReceiptDto[]>("/api/Receipt");
    return res.data;
}

export async function getReceipt(id: string) {
    const res = await http.get<ReadReceiptDto>(`/api/Receipt/${id}`);
    return res.data;
}

export async function createReceipt(dto: CreateReceiptDto) {
    const res = await http.post<ReadReceiptDto>("/api/Receipt", dto);
    return res.data
}

export async function updateReceipt(id: string, dto: UpdateReceiptDto) {
  await http.put(`/api/Receipt/${id}`, dto);
}

export async function deleteReceipt(id: string) {
    await http.delete(`/api/Receipt/${id}`);
}
