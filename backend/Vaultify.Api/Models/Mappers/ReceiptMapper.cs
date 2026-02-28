using Vaultify.Api.Models.DTOs;
using Vaultify.Api.Models.Entities;

namespace Vaultify.Api.Models.Mappers
{
    public static class ReceiptMapper
    {
        public static ReadReceiptDto ToReadDto(this Receipt receipt)
        {
            if (receipt == null) throw new ArgumentNullException(nameof(receipt));
            return new ReadReceiptDto
            {
                Id = receipt.Id,
                Title = receipt.Title,
                Store = receipt.Store,
                Price = receipt.Price,
                Currency = receipt.Currency,
                Category = receipt.Category,
                PurchaseDate = receipt.PurchaseDate.ToString("yyyy-MM-dd"),
                WarrantyMonths = receipt.WarrantyMonths,
                WarrantyEndDate = receipt.WarrantyEndDate.HasValue
    ? receipt.WarrantyEndDate.Value.ToString("yyyy-MM-dd")
    : null,
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
                WarrantyMonths = dto.WarrantyMonths,
                Notes = dto.Notes,
                ImageURL = dto.ImageURL
            };
        }
        public static void ApplyUpdate(this Receipt receipt, UpdateReceiptDto dto)
        {
            if (receipt == null) throw new ArgumentNullException(nameof(receipt));
            if (dto == null) throw new ArgumentNullException(nameof(dto));

            receipt.Title = dto.Title;
            receipt.Store = dto.Store;
            receipt.Price = dto.Price;
            receipt.Currency = dto.Currency;
            receipt.Category = dto.Category;
            receipt.WarrantyMonths = dto.WarrantyMonths;
            receipt.Notes = dto.Notes;
            receipt.ImageURL = dto.ImageURL;
        }
    }
}
