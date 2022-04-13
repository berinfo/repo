using Microsoft.AspNetCore.Mvc;
using server.Units;
using Server.Core.Interfaces;
using System.Threading.Tasks;

namespace server.Api.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class StoredProcController : ControllerBase
    {
        private readonly IStoredProcService _storedProcService;

        public StoredProcController(IStoredProcService storedProcService)
        {
            _storedProcService = storedProcService;
        }

        [HttpGet("RecipesWith6orMore")]
        public async Task<IActionResult> GetRecipesWith6orMoreIngredients()
        {
            return Ok(await _storedProcService.GetRecipesWith6orMoreIngredients());
        }

        [HttpGet("RecipsByCategorySp")]
         public async Task<IActionResult> GetRecipesByCategory()
        {
            return Ok(await _storedProcService.GetRecipesByCategorySp());
        }

        [HttpGet("MostUsedIngredients")]
        public async Task<IActionResult> GetMostUsedIngredients(int minquant, int maxquant, UnitEnum unit)
        {
            return Ok(await _storedProcService.GetMostUsedIngredients( minquant, maxquant, unit));
        }

    }
    
}
