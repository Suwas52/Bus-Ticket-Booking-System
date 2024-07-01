
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

        [Authorize(Roles = StaticRoleUser.SUPERADMIN)]
        [HttpGet]
        [Route("AllUser")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> UserList()
        {
            var allUsers = await authRepository.UserListAsync();
            return Ok(allUsers);
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
    }
}