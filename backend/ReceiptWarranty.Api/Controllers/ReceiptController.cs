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
    [ProducesResponseType(typeof(IEnumerable<ReadReceiptDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAllAsync()
    {
        var receipts = await _receiptService.GetAllAsync();
        var result = receipts.Select(r => r.ToReadDto());

        return Ok(result);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ReadReceiptDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(string id)
    {
        var receipt = await _receiptService.GetByIdAsync(id);

        return Ok(receipt.ToReadDto());
    }
    [HttpPost]
    [ProducesResponseType(typeof(ReadReceiptDto), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateAsync([FromBody] CreateReceiptDto dto)
    {
        var created = await _receiptService.CreateAsync(dto);

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

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateAsync(string id, [FromBody] UpdateReceiptDto dto)
    {
        await _receiptService.UpdateAsync(id, dto);
        return NoContent();
    }
}