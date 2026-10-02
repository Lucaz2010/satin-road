using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace API;

public class MyExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        httpContext.Response.StatusCode = 400;
      await httpContext.Response.WriteAsJsonAsync(
            new ProblemDetails()
            {
                Title = exception.Message
                
            },
            cancellationToken
            );
        return true;
    }
}