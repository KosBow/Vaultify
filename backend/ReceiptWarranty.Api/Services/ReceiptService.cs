using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ReceiptWarranty.Api.Models;

namespace ReceiptWarranty.Api.Services
{
    public class ReceiptService
    {
        private readonly IMongoCollection<Receipt> _collection;

        public ReceiptService(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _collection = database.GetCollection<Receipt>(settings.Value.CollectionName);
        }

        public async Task<List<Receipt>> GetAllAsync() =>
            await _collection.Find(_ => true).ToListAsync();

        public async Task<Receipt?> GetByIdAsync(string id) =>
            await _collection.Find(r => r.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Receipt receipt) =>
            await _collection.InsertOneAsync(receipt);
     }
}
