using ReceiptWarranty.Api.Models.DTOs;

namespace ReceiptWarranty.Api.Models
{
    public static class ReceiptMapper
    {
        public static ReadReceiptDto ToReadDto(this Receipt receipt)
        {
            return new ReadReceiptDto
            {
                Id = receipt.Id,
                Title = receipt.Title,
                Store = receipt.Store,
                Price = receipt.Price,
                Currency = receipt.Currency,
                Category = receipt.Category,
                PurchaseDate = receipt.PurchaseDate,
                WarrantyMonths = receipt.WarrantyMonths,
                WarrantyEndDate = receipt.WarrantyEndDate,
                Notes = receipt.Notes,
                ImageURL = receipt.ImageURL
            };
        }

        public static Receipt FromCreateDto(CreateReceiptDto dto)
        {
            return new Receipt
            {
                Title = dto.Title,
                Store = dto.Store,
                Price = dto.Price,
                Currency = dto.Currency,
                Category = dto.Category,
                PurchaseDate = dto.PurchaseDate,
                WarrantyMonths = dto.WarrantyMonths,
                Notes = dto.Notes,
                ImageURL = dto.ImageURL
            };
        }
    }
}
