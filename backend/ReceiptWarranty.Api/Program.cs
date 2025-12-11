using ReceiptWarranty.Api.Models;
using ReceiptWarranty.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDB"));

builder.Services.AddSingleton<ReceiptService>();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
