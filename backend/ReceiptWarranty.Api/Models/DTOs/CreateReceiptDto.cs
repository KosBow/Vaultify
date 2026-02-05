using ReceiptWarranty.Api.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace ReceiptWarranty.Api.Models.DTOs
{
    public class CreateReceiptDto
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Store { get; set; } = string.Empty;

        [Required]
        [Range(0.01, 1_000_000, ErrorMessage = "Price must be between 0.01 and 1 000 000")]
        public decimal Price { get; set; }

        [Required]
        public Currency Currency { get; set; } = Currency.SEK;

        [Required]
        [StringLength(50)]
        public string Category { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Date)]
        public DateTime PurchaseDate { get; set; }

        [Range(0, 120)]
        public int WarrantyMonths { get; set; }

        public string? Notes { get; set; }
        public string? ImageURL { get; set; }
    }
}
