using Vaultify.Api.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace Vaultify.Api.Models.DTOs
{
    public class UpdateReceiptDto
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Store { get; set; } = string.Empty;

        [Required]
        [Range(0.01, 1_000_000)]
        public decimal Price { get; set; }

        [Required]
        public Currency Currency { get; set; }

        [Required]
        [StringLength(50)]
        public string Category { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Date)]
        public string PurchaseDate { get; set; } = string.Empty;

        [Range(0, 120)]
        public int WarrantyMonths { get; set; }

        public string? Notes { get; set; }
        public string? ImageURL { get; set; }

    }
}
