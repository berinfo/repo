using System.Threading.Tasks;
using server.Data;
using server.Models;
using Microsoft.AspNetCore.Mvc;
using server.Dtos;
using server.Response;
//using Microsoft.AspNetCore.Cors;

namespace dotnet_course.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;
        public AuthController(IAuthRepository authRepo)
        {
            _authRepo = authRepo;

        }
        //[HttpPost("Register")]
        //public async Task<ActionResult<ServiceResponse<int>>> Register(UserRegisterDto request)
        //{
        //    var response = await _authRepo.Register(
        //        new User { Username = request.Username }, request.Password
        //    );
        //    if (!response.Success)
        //    {
        //        return BadRequest(response);
        //    }

        //    return Ok(response);
        //}

        //[EnableCors("CORS")]
        [HttpPost("Login")]
        public async Task<ActionResult<ServiceResponse<string>>> Login(UserLoginDto request)
        {
            var response = await _authRepo.Login(
                request.Username, request.Password
            );
            if (!response.Success)
            {
                return BadRequest(response);
            }
            
            return Ok(response);
        }
    }
}