using Microsoft.AspNetCore.Mvc;
using Vaultify.Api.Exceptions;
using System.Text.Json;

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
                await WriteProblemDetailsAsync(context, 400, ex.Message);
            }
            catch (Exception)
            {
                await WriteProblemDetailsAsync(context, 500, "An unexpected error occurred.");
            }
        }

        private static async Task WriteProblemDetailsAsync(
            HttpContext context,
            int statusCode,
            string message)
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
                    _ => "Server error"
                },
                Status = statusCode,
                Detail = message
            };

            await context.Response.WriteAsync(JsonSerializer.Serialize(problem));
        }
    }
}
