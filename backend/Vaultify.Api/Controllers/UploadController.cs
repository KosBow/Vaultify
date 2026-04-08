using Microsoft.AspNetCore.Mvc;

namespace Vaultify.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadController : ControllerBase
{
    private readonly IWebHostEnvironment _env;

    public UploadController(IWebHostEnvironment env)
    {
        _env = env;
    }

    [HttpPost]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file provided.");

        if (file.Length > 10 * 1024 * 1024)
            return BadRequest("File too large. Max 10MB.");

        var allowed = new[] { ".jpg", ".jpeg", ".png", ".webp" };
        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!allowed.Contains(ext))
            return BadRequest("Only JPG, PNG and WebP are allowed.");

        var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads");
        Directory.CreateDirectory(uploadsFolder);

        var fileName = $"{Guid.NewGuid()}{ext}";
        var filePath = Path.Combine(uploadsFolder, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
            await file.CopyToAsync(stream);

        var url = $"{Request.Scheme}://{Request.Host}/uploads/{fileName}";
        return Ok(new { url });
    }
}