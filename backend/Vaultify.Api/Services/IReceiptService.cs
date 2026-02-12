using Vaultify.Api.Models.DTOs;
using Vaultify.Api.Models.Entities;

namespace Vaultify.Api.Services
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