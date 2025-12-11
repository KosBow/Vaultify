using MongoDB.Bson.Serialization.Attributes;

namespace ReceiptWarranty.Api.Models
{
    public class Receipt
    {
        [BsonId]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Title { get; set; } = string.Empty;
        public string Store { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Currency { get; set; } = "SEK";
        public string Category { get; set; } = string.Empty;
        public DateTime PurschaseDate { get; set; }
        public int WarrantyMonths { get; set; }
        public DateTime WarrantyEndDate { get; set; }
        public string? Notes { get; set; }
        public string? ImageURL { get; set; }
    }
}
