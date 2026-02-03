using ReceiptWarranty.Api.Models;
using ReceiptWarranty.Api.Models.DTOs;

namespace ReceiptWarranty.Api.Services
{
    public interface IReceiptService
    {
        Task<List<Receipt>> GetAllAsync();
        Task<Receipt> GetByIdAsync(string id);
        Task<Receipt> CreateAsync(CreateReceiptDto dto);
        Task DeleteAsync(string id);
        Task UpdateAsync(string id, UpdateReceiptDto dto);
    }
}