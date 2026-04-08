using Vaultify.Api.Models.DTOs;
using Vaultify.Api.Models.Entities;

namespace Vaultify.Api.Models.Mappers
{
    public static class ReceiptMapper
    {
        // Maps frontend display string → enum value
        private static readonly Dictionary<string, ReceiptCategory> _categoryMap = new()
        {
            ["Electronics"] = ReceiptCategory.Electronics,
            ["Appliances"] = ReceiptCategory.Appliances,
            ["Furniture"] = ReceiptCategory.Furniture,
            ["Tools & Hardware"] = ReceiptCategory.ToolsAndHardware,
            ["Clothing & Shoes"] = ReceiptCategory.ClothingAndShoes,
            ["Sports & Fitness"] = ReceiptCategory.SportsAndFitness,
            ["Automotive"] = ReceiptCategory.Automotive,
            ["Home & Garden"] = ReceiptCategory.HomeAndGarden,
            ["Health & Beauty"] = ReceiptCategory.HealthAndBeauty,
            ["Toys & Games"] = ReceiptCategory.ToysAndGames,
            ["Musical Instruments"] = ReceiptCategory.MusicalInstruments,
            ["Jewelry & Watches"] = ReceiptCategory.JewelryAndWatches,
            ["Travel & Luggage"] = ReceiptCategory.TravelAndLuggage,
            ["Office & Stationery"] = ReceiptCategory.OfficeAndStationery,
            ["Baby & Kids"] = ReceiptCategory.BabyAndKids,
            ["Pet Supplies"] = ReceiptCategory.PetSupplies,
            ["Other"] = ReceiptCategory.Other,
        };

        // Reverse map: enum value → display string
        private static readonly Dictionary<ReceiptCategory, string> _categoryDisplayMap =
            _categoryMap.ToDictionary(kv => kv.Value, kv => kv.Key);

        private static ReceiptCategory ParseCategory(string? value) =>
            value != null && _categoryMap.TryGetValue(value.Trim(), out var cat)
                ? cat
                : ReceiptCategory.Other;

        private static string CategoryToString(ReceiptCategory cat) =>
            _categoryDisplayMap.TryGetValue(cat, out var name) ? name : "Other";

        // ──────────────────────────────────────────

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
                Category = CategoryToString(receipt.Category),   // ← enum → display string
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
                Category = ParseCategory(dto.Category),           // ← display string → enum
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
            receipt.Category = ParseCategory(dto.Category);       // ← display string → enum
            receipt.WarrantyMonths = dto.WarrantyMonths;
            receipt.Notes = dto.Notes;
            receipt.ImageURL = dto.ImageURL;
        }
    }
}