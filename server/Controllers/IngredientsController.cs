using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Dtos;
using server.Models;
using server.Response;
using server.Services;
using Server.Core.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Controllers
{
 //   [Authorize(Policy = "AdminAccess")]
   // [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class IngredientsController : ControllerBase
    {
        private readonly IIngredientService _ingredientService;

        public IngredientsController(IIngredientService ingredientService)
        {
            _ingredientService = ingredientService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] BaseSearch search)
        {
            return Ok(await _ingredientService.GetIngredients(search));
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _ingredientService.GetAllIngredients());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetIngredient(int id)
        {
            return Ok(await _ingredientService.GetIngredient(id));
        }

   
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIngredient(int id)
        {
            return Ok(await _ingredientService.DeleteIngredient(id));
        }

    
        [HttpPost]
        public async Task<IActionResult> CreateIngredient(AddIngredientDto newIngredient)
        {
            return Ok(await _ingredientService.CreateIngredient(newIngredient));
        }

      
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIngredient(int id, AddIngredientDto newIngredient)
        {
            return Ok(await _ingredientService.UpdateIngredient(id, newIngredient));
        }
    }
}
