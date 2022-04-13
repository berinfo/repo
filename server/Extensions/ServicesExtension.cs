using Microsoft.Extensions.DependencyInjection;
using server.Data;
using server.Services;
using Server.Core.Interfaces;
using Server.Services.Services;

namespace server.Extensions
{
    public static class ServicesExtension
    {
        public static void ServicesSetup(this IServiceCollection services)
        {
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IIngredientService, IngredientService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IRecipeService, RecipeService>();
            services.AddScoped<IStoredProcService, StoredProcService>();
        }
    }
}
