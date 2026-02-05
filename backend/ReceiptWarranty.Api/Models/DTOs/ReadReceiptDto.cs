using ReceiptWarranty.Api.Models.Entities;

namespace ReceiptWarranty.Api.Models.DTOs
{
    public class ReadReceiptDto
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Store { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public Currency Currency { get; set; }
        public string Category { get; set; } = string.Empty;
        public DateTime PurchaseDate { get; set; }
        public int WarrantyMonths { get; set; }
        public DateTime? WarrantyEndDate { get; set; }
        public string? Notes { get; set; }
        public string? ImageURL { get; set; }
    }
}
