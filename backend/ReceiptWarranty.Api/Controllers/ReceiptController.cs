using Microsoft.AspNetCore.Mvc;
using ReceiptWarranty.Api.Models;
using ReceiptWarranty.Api.Models.DTOs;
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

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var receipt = await _receiptService.GetByIdAsync(id);

        if (receipt == null)
            return NotFound(new { message = $"Receipt with id {id} not found" });

        return Ok(receipt);
    }

    [HttpPost]
    public async Task<IActionResult> CreateAsync([FromBody] CreateReceiptDto dto)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var receipt = new Receipt
        {
            Category = dto.Category,
            Currency = dto.Currency,
            ImageURL = dto.ImageURL,
            Notes = dto.Notes,
            Price = dto.Price,

            PurchaseDate = dto.PurchaseDate,
            WarrantyMonths = dto.WarrantyMonths,
            Store = dto.Store,
            Title = dto.Title,
        };

       var created = await _receiptService.CreateAsync(receipt);

        return CreatedAtAction(
            nameof(GetById),
            new { id = created.Id},
            created
            );
    }
}