using MailKit.Net.Smtp;
using MimeKit;
using Vaultify.Api.Services;

namespace Vaultify.Api.Services;

public class WarrantyReminderService : BackgroundService
{
    private readonly IServiceProvider _services;
    private readonly IConfiguration _config;
    private readonly ILogger<WarrantyReminderService> _logger;

    public WarrantyReminderService(
        IServiceProvider services,
        IConfiguration config,
        ILogger<WarrantyReminderService> logger)
    {
        _services = services;
        _config   = config;
        _logger   = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await CheckAndSendReminders();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Warranty reminder check failed.");
            }

            await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
        }
    }

    private async Task CheckAndSendReminders()
    {
        using var scope        = _services.CreateScope();
        var receiptService     = scope.ServiceProvider.GetRequiredService<IReceiptService>();

        var receipts = await receiptService.GetAllAsync();

        var expiring = receipts.Where(r =>
            r.WarrantyEndDate.HasValue &&
            r.WarrantyEndDate.Value > DateTime.UtcNow &&
            r.WarrantyEndDate.Value <= DateTime.UtcNow.AddDays(30)
        ).ToList();

        if (!expiring.Any())
        {
            _logger.LogInformation("Warranty check: no expiring warranties.");
            return;
        }

        _logger.LogInformation("Warranty check: {Count} expiring warranties found.", expiring.Count);

        var toEmail = _config["Email:Username"];
        if (string.IsNullOrWhiteSpace(toEmail)) return;

        var body = string.Join("\n", expiring.Select(r =>
            $"• {r.Title} (expires {r.WarrantyEndDate!.Value:yyyy-MM-dd})"));

        await SendEmail(
            toEmail,
            $"⚠️ {expiring.Count} warranties expiring soon — Vaultify",
            $"Hi,\n\nThe following warranties expire within 30 days:\n\n{body}\n\nLog in to Vaultify to review them.\n\n— Vaultify"
        );
    }

    private async Task SendEmail(string to, string subject, string body)
    {
        var smtpHost = _config["Email:SmtpHost"];
        var smtpPort = int.Parse(_config["Email:SmtpPort"] ?? "587");
        var username = _config["Email:Username"];
        var password = _config["Email:Password"];
        var fromName = _config["Email:FromName"] ?? "Vaultify";

        if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
        {
            _logger.LogWarning("Email not configured. Skipping warranty reminder.");
            return;
        }

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(fromName, username));
        message.To.Add(MailboxAddress.Parse(to));
        message.Subject = subject;
        message.Body    = new TextPart("plain") { Text = body };

        using var client = new SmtpClient();
        await client.ConnectAsync(smtpHost, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(username, password);
        await client.SendAsync(message);
        await client.DisconnectAsync(true);

        _logger.LogInformation("Warranty reminder sent to {Email}.", to);
    }
}