using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BusBooking.Core.Dto.Auth;
using BusBooking.Core.Dto.General;
using BusBooking.Core.Model;

namespace BusBooking.Core.Interface.IRepository
{
    public interface IAuthRepository
    {
        Task<GeneralResponseDto> SeedRolesAsync();
        Task<GeneralResponseDto> RegisterAsync(RegisterDto registerDto);

        Task<LoginResponseDto> LoginAsync(LoginDto loginDto);

        Task<GeneralResponseDto> UpdateUserAsync(UserUpdateDto model, string id);

        Task<GeneralResponseDto> ChangePasswordAsync(string userId, ChangePasswordDto model);

        Task<GeneralResponseDto> ConfirmEmailAsync(string userId, string token);

        Task<IEnumerable<UserInformation>> UserListAsync();
        Task<LoginResponseDto?> MeAsync(MeDto meDto);
        Task<UserInformation> GetUserDetailsByUserNameAsync(string username);

        Task<GeneralResponseDto> UpdateRoleAsync(ClaimsPrincipal User, UpdateRoleDto updateRoleDto);
        Task<int> GetTotalUsersCountAsync();
    }
}