using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Vaultify.Api.Exceptions;

namespace Vaultify.Api.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (DomainException ex)
            {
                await WriteProblemDetailsAsync(context, ex.StatusCode, ex.Message);
            }
            catch (ArgumentException ex)
            {
                await WriteProblemDetailsAsync(context, StatusCodes.Status400BadRequest, ex.Message);
            }
            catch (Exception)
            {
                await WriteProblemDetailsAsync(context, StatusCodes.Status500InternalServerError, "An unexpected error occurred.");
            }
        }

        private static async Task WriteProblemDetailsAsync(HttpContext context, int statusCode, string message)
        {
            context.Response.ContentType = "application/problem+json";
            context.Response.StatusCode = statusCode;

            var problem = new ProblemDetails
            {
                Type = "about:blank",
                Title = statusCode switch
                {
                    400 => "Bad Request",
                    404 => "Not Found",
                    500 => "Server Error",
                    _ => "Error"
                },
                Status = statusCode,
                Detail = message,
                Instance = context.Request.Path
            };

            problem.Extensions["traceId"] = context.TraceIdentifier;

            var jsonOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            await context.Response.WriteAsync(JsonSerializer.Serialize(problem, jsonOptions));
        }
    }
}