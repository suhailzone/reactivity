using Application.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Middleware
{
    public class ErrorHandlingMiddleware
    {
        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            Next = next;
            Logger = logger;
        }

        public RequestDelegate Next { get; }
        public ILogger<ErrorHandlingMiddleware> Logger { get; }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await Next(context);
            }
            catch(Exception ex)
            {
                await HandleExceptionAsync(context, ex, Logger);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex, ILogger<ErrorHandlingMiddleware> logger)
        {
            object errors = null;
            switch (ex)
            {
                case RestException re:
                    logger.LogError(ex, "REST ERROR");
                    errors = re.Errors;
                    context.Response.StatusCode = (int)re.Code;
                    break;

                case Exception e:
                    logger.LogError(ex, "Server Error");
                    errors = string.IsNullOrWhiteSpace(e.Message) ? "Error" : e.Message;
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    break;
            }

            context.Response.ContentType = "application/json";
            if(errors != null)
            {
                var result = JsonSerializer.Serialize(new
                {
                    errors
                });
                await context.Response.WriteAsync(result);
            }
        }
    }
}
