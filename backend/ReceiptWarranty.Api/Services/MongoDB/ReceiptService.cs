using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ReceiptWarranty.Api.Exceptions;
using ReceiptWarranty.Api.Models;

namespace ReceiptWarranty.Api.Services
{
    public class ReceiptService : IReceiptService
    {
        private readonly IMongoCollection<Receipt> _collection;

        public ReceiptService(
            IMongoDatabase database,
            IOptions<MongoDbSettings> settings)
        {
            _collection = database.GetCollection<Receipt>(
                settings.Value.CollectionName
            );
        }

        public async Task<List<Receipt>> GetAllAsync()
        {
            return await _collection
                .Find(_ => true)
                .ToListAsync();
        }

        public async Task<Receipt> GetByIdAsync(string id)
        {
            var receipt = await _collection
                .Find(r => r.Id == id)
                .FirstOrDefaultAsync();

            if (receipt == null)
                throw new NotFoundException($"Receipt with id {id} not found");

            return receipt;
        }

        public async Task<Receipt> CreateAsync(Receipt receipt)
        {
            if (receipt.PurchaseDate.Date > DateTime.UtcNow.Date)
                throw new DomainException("Purchase date cannot be in the future", 400);

            if (receipt.Price <= 0)
                throw new DomainException("Price must be greater than zero", 400);

            receipt.Title = receipt.Title.Trim();
            receipt.Store = receipt.Store.Trim();

            receipt.WarrantyEndDate = receipt.WarrantyMonths > 0
                ? receipt.PurchaseDate.AddMonths(receipt.WarrantyMonths)
                : null;

            await _collection.InsertOneAsync(receipt);

            return receipt;
        }

        public async Task DeleteAsync(string id)
        {
            var result = await _collection.DeleteOneAsync(r => r.Id == id);

            if (result.DeletedCount == 00)
                throw new NotFoundException($"Receipt with id {id} not found");
        }
    }
}
