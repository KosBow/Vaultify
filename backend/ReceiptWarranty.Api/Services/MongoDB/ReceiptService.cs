using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ReceiptWarranty.Api.Models;

namespace ReceiptWarranty.Api.Services
{
    public class ReceiptService
    {
        private readonly IMongoCollection<Receipt> _collection;

        public ReceiptService(IMongoDatabase database, IOptions<MongoDbSettings> settings)
        {
            _collection = database.GetCollection<Receipt>(settings.Value.CollectionName);
        }
        

        public async Task<List<Receipt>> GetAllAsync() =>
            await _collection.Find(_ => true).ToListAsync();

        public async Task<Receipt?> GetByIdAsync(string id) =>
            await _collection.Find(r => r.Id == id).FirstOrDefaultAsync();

        public async Task<Receipt> CreateAsync(Receipt receipt)
        {
            receipt.WarrantyEndDate = receipt.WarrantyMonths > 0
                ? receipt.PurchaseDate.AddMonths(receipt.WarrantyMonths)
                : null;

            await _collection.InsertOneAsync(receipt);
            return receipt;
        }
    }
}
