
using BusBooking.Constants;
using BusBooking.Core.Dto;
using BusBooking.Core.Dto.Auth;
using BusBooking.Core.Dto.General;
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
        private readonly IBookingRepo bookingRepo;
        private readonly IBusRepo busRepo;
        private readonly IRouteRepo routeRepo;

        public AuthController(IAuthRepository authRepository, IBookingRepo bookingRepo, IBusRepo busRepo, IRouteRepo routeRepo)
        {
            this.authRepository = authRepository;
            this.bookingRepo = bookingRepo;
            this.busRepo = busRepo;
            this.routeRepo = routeRepo;
        }

        [Authorize(Roles = StaticRoleUser.SuperAdminAndAdmin)]
        [HttpGet]
        [Route("AllUser")]
        public async Task<ActionResult<IEnumerable<UserInformation>>> UserList()
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

        [HttpPost]
        [Route("update-role")]
        [Authorize(Roles = StaticRoleUser.SUPERADMIN)]
        public async Task<IActionResult> UpdateRole([FromBody] UpdateRoleDto updateRoleDto)
        {
            var updateRoleResult = await authRepository.UpdateRoleAsync(User, updateRoleDto);

            if (updateRoleResult.IsSucceed)
            {
                return Ok(updateRoleResult.Message);
            }
            else
            {
                return StatusCode(updateRoleResult.StatusCode, updateRoleResult.Message);
            }
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


        [HttpPut]
        [Route("Update-User/{userName}")]
        public async Task<ActionResult<GeneralResponseDto>> UpdateUser([FromBody] UserUpdateDto model, string userName)
        {
            try
            {
                var response = await authRepository.UpdateUserAsync(model, userName);
                return response;
                
            }
            catch(Exception ex)
            {
                return new GeneralResponseDto
                {
                    IsSucceed = false,
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Message = ex.Message
                };
            }
        }
        


        [HttpGet]
        [Route("users/{userName}")]
        public async Task<ActionResult<UserInformation>> GetUserDetailsByUserName([FromRoute] string userName)
        {
            var user = await authRepository.GetUserDetailsByUserNameAsync(userName);
            if (user is not null)
            {
                return Ok(user);
            }
            else
            {
                return NotFound("UserName not found");
            }
        }

        
        [HttpGet("count")]
        [Authorize(Roles = StaticRoleUser.SuperAdminAndAdmin)]
        public async Task<ActionResult<DashboardDataDto>> GetBookingCounts()
        {
            try
            {
                var totalBookingCount = await bookingRepo.GetTotalBookingsCountAsync();
                var totalUserCount = await authRepository.GetTotalUsersCountAsync();
                var totalBusCount = await busRepo.GetTotalBusCount();
                var totalRouteCount = await routeRepo.GetTotalRoutesCountAsync();

                var result = new DashboardDataDto
                {
                    TotalBookings = totalBookingCount,
                    TotalBuses = totalBusCount,
                    TotalRoutes = totalRouteCount,
                    TotalUsers = totalUserCount,
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, "An error occurred while getting booking counts.");
            }
        }
    }
}