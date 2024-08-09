
using BusBooking.Constants;
using BusBooking.Core.Dto.Auth;
using BusBooking.Core.Model;
using BusBooking.Core.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BusBooking.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository authRepository;

        public AuthController(IAuthRepository authRepository)
        {
            this.authRepository = authRepository;
        }

        [Authorize(Roles = StaticRoleUser.OwnerAdmin)]
        [HttpGet]
        [Route("AllUser")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> UserList()
        {
            try
            {
                var allUsers = await authRepository.UserListAsync();
                return Ok(allUsers);
            }
            catch (Exception ex)
            {
                return NotFound(ex);
            }
        }

        // Route -> Seed Roles to DB
        [HttpPost]
        [Route("seed-roles")]
        public async Task<IActionResult> SeedRoles()
        {
            var seedResult = await authRepository.SeedRolesAsync();
            return StatusCode(seedResult.StatusCode, seedResult.Message);
        }

        // Route -> Register
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var registerResult = await authRepository.RegisterAsync(registerDto);
            return StatusCode(registerResult.StatusCode, registerResult.Message);
        }

        [HttpPost]
        [Route("login")]

        public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginDto loginDto)
        {
            var loginDetail = await authRepository.LoginAsync(loginDto);

            if (loginDetail == null)
            {
                return Unauthorized(new
                {
                    StatusCode = 401,
                    Message = "Your credentials are invalid. Please contact an Admin."
                });
            }

            if (!string.IsNullOrEmpty(loginDetail.ErrorMessage))
            {
                return Unauthorized(new
                {
                    StatusCode = 401,
                    Message = loginDetail.ErrorMessage
                });
            }
            return Ok(loginDetail);
        }


        // Route -> getting data of a user from it's JWT
        [HttpPost]
        [Route("me")]
        public async Task<ActionResult<LoginResponseDto>> Me([FromBody] MeDto token)
        {
            try
            {
                var me = await authRepository.MeAsync(token);
                if (me is not null)
                {
                    return Ok(me);
                }
                else
                {
                    return Unauthorized("Invalid Token");
                }
            }
            catch (Exception)
            {
                return Unauthorized("Invalid Token");
            }
        }
    }
}