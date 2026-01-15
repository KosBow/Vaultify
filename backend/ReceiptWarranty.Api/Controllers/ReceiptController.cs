using Microsoft.AspNetCore.Mvc;
using ReceiptWarranty.Api.Models;
using ReceiptWarranty.Api.Models.DTOs;
using ReceiptWarranty.Api.Services;

namespace ReceiptWarranty.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReceiptController : ControllerBase
{

private readonly IReceiptService _receiptService;

public ReceiptController(IReceiptService receiptService)
{
    _receiptService = receiptService;
}


    [HttpGet]
    public async Task<IActionResult> GetAllAsync()
    {
        var receipts = await _receiptService.GetAllAsync();
        var result = receipts.Select(r => r.ToReadDto());

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var receipt = await _receiptService.GetByIdAsync(id);

        return Ok(receipt.ToReadDto());
    }

    [HttpPost]
    public async Task<IActionResult> CreateAsync([FromBody] CreateReceiptDto dto)
    {
        var receipt = ReceiptMapper.FromCreateDto(dto);
        var created = await _receiptService.CreateAsync(receipt);

        return CreatedAtAction(
            nameof(GetById),
            new { id = created.Id },
            created.ToReadDto()
            );
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteAsync(string id)
    {
        await _receiptService.DeleteAsync(id);
        return NoContent();
    }

}