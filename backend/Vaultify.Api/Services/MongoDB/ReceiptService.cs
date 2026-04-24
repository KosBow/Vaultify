using System.Globalization;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Vaultify.Api.Exceptions;
using Vaultify.Api.Models;
using Vaultify.Api.Models.DTOs;
using Vaultify.Api.Models.Entities;
using Vaultify.Api.Models.Mappers;

namespace Vaultify.Api.Services
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

        private static DateTime ParseDateOnlyToUtc(string dateOnly)
        {
            if (string.IsNullOrWhiteSpace(dateOnly))
                throw new DomainException("Purchase date is required", 400);

            if (!DateTime.TryParseExact(
                    dateOnly,
                    "yyyy-MM-dd",
                    CultureInfo.InvariantCulture,
                    DateTimeStyles.None,
                    out var parsed))
            {
                throw new DomainException("Invalid date format. Use YYYY-MM-DD.", 400);
            }

            return DateTime.SpecifyKind(parsed.Date, DateTimeKind.Utc);
        }

        private static DateTime? CalcWarrantyEndDateUtc(DateTime purchaseDateUtc, int warrantyMonths)
        {
            if (warrantyMonths <= 0) return null;

            var end = purchaseDateUtc.AddMonths(warrantyMonths).Date;
            return DateTime.SpecifyKind(end, DateTimeKind.Utc);
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

        public async Task<Receipt> CreateAsync(CreateReceiptDto dto)
        {
            var receipt = ReceiptMapper.FromCreateDto(dto);

            receipt.PurchaseDate = ParseDateOnlyToUtc(dto.PurchaseDate);

            if (receipt.PurchaseDate.Date > DateTime.UtcNow.Date)
                throw new DomainException("Purchase date cannot be in the future", 400);

            if (receipt.Price <= 0)
                throw new DomainException("Price must be greater than zero", 400);

            receipt.Title = receipt.Title.Trim();
            receipt.Store = receipt.Store.Trim();

            receipt.WarrantyEndDate = CalcWarrantyEndDateUtc(receipt.PurchaseDate, receipt.WarrantyMonths);

            await _collection.InsertOneAsync(receipt);

            return receipt;
        }

        public async Task DeleteAsync(string id)
        {
            var result = await _collection.DeleteOneAsync(r => r.Id == id);

            if (result.DeletedCount == 0)
                throw new NotFoundException($"Receipt with id {id} not found");
        }

        public async Task UpdateAsync(string id, UpdateReceiptDto dto)
        {
            var existingReceipt = await _collection
                .Find(r => r.Id == id)
                .FirstOrDefaultAsync();

            if (existingReceipt == null)
                throw new NotFoundException($"Receipt with id {id} not found");

            var purchaseDateUtc = ParseDateOnlyToUtc(dto.PurchaseDate);

            if (purchaseDateUtc.Date > DateTime.UtcNow.Date)
                throw new DomainException("Purchase date cannot be in the future", 400);

            if (dto.Price <= 0)
                throw new DomainException("Price must be greater than zero", 400);

            existingReceipt.Title = dto.Title.Trim();
            existingReceipt.Store = dto.Store.Trim();
            existingReceipt.Price = dto.Price;
            existingReceipt.Currency = dto.Currency;
            existingReceipt.Category =
                 Enum.TryParse<ReceiptCategory>(dto.Category, true, out var category)
                   ? category
                   : ReceiptCategory.Other;

            existingReceipt.PurchaseDate = purchaseDateUtc;

            existingReceipt.WarrantyMonths = dto.WarrantyMonths;
            existingReceipt.Notes = dto.Notes;
            existingReceipt.ImageURL = dto.ImageURL;

            existingReceipt.WarrantyEndDate = CalcWarrantyEndDateUtc(existingReceipt.PurchaseDate, existingReceipt.WarrantyMonths);

            await _collection.ReplaceOneAsync(
                r => r.Id == id,
                existingReceipt
            );
        }
    }
}