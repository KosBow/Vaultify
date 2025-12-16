using Microsoft.AspNetCore.Mvc;
using ReceiptWarranty.Api.Models;
using ReceiptWarranty.Api.Services;

namespace ReceiptWarranty.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReceiptController : ControllerBase
{

    private readonly ReceiptService _receiptService;

    public ReceiptController(ReceiptService receiptService)
    {
        _receiptService = receiptService;
    }


    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        var receipts = await _receiptService.GetAllAsync();
        return Ok(new { message = "Success", Data = receipts });
    }

    [HttpPost]
    public async Task<IActionResult> CreateAsync(Receipt receipt)
    {
        var created = new Receipt()
        {
            Category = receipt.Category,
            Currency = receipt.Currency,
            ImageURL = receipt.ImageURL,
            Notes = receipt.Notes,
            Price = receipt.Price,
            PurchaseDate = receipt.PurchaseDate,
            WarrantyEndDate = receipt.WarrantyEndDate,
            Store = receipt.Store,
            Title = receipt.Title,
        };

        await _receiptService.CreateAsync(created);


        return Ok(created);
    }
}