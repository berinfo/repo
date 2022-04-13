using Microsoft.AspNetCore.Builder;
using server.Middlewares;

namespace server.Extensions
{
    public static class ExceptionExtension
    {
        public static void ExceptionHander(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
