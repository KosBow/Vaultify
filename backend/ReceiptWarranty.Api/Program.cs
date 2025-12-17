using dotenv.net;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ReceiptWarranty.Api.Models;
using ReceiptWarranty.Api.Services;
using System.Text.Json.Serialization;



DotEnv.Load();

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter()
            );
    });
builder.Services.AddEndpointsApiExplorer();


builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("V1", new()
    {
        Title = "Receipt Warranty API",
        Version = "v1"
    });
});




// Här är mongoDB settings för att kunna återanvända koden på bättre sätt
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDB"));

builder.Services.AddSingleton<IMongoClient>(mongo =>
{
    var options = mongo.GetService<IOptions<MongoDbSettings>>();
    return new MongoClient(options?.Value.ConnectionString);
});


builder.Services.AddSingleton(mongo =>
{
    var settings = mongo.GetRequiredService<IOptions<MongoDbSettings>>();
    var client = mongo.GetRequiredService<IMongoClient>();
    return client.GetDatabase(settings.Value.DatabaseName);
});

builder.Services.AddScoped<ReceiptService>();


var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/V1/swagger.json", "V1");
    options.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
