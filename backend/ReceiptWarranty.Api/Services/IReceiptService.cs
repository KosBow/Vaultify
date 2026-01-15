using ReceiptWarranty.Api.Models;

namespace ReceiptWarranty.Api.Services
{
    public interface IReceiptService
    {
        Task<List<Receipt>> GetAllAsync();
        Task<Receipt> GetByIdAsync(string id);
        Task<Receipt> CreateAsync(Receipt receipt);
        Task DeleteAsync(string id);
    }
}
