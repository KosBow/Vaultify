using dotenv.net;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Vaultify.Api.Models;
using Vaultify.Api.Services;
using System.Text.Json.Serialization;
using Vaultify.Api.Middleware;


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
options.SwaggerDoc("v1", new()
{
    Title = "Vaultify API",
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

builder.Services.AddScoped<IReceiptService, ReceiptService>();

var corsPolicyName = "VaultifyCors";

builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName, policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseCors(corsPolicyName);

app.UseAuthorization();
app.MapControllers();

app.Run();