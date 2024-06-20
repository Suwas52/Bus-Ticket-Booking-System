using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BusBooking.Core.Dto.Auth;
using BusBooking.Core.Dto.General;

namespace BusBooking.Core.Repository.Interface
{
    public interface IAuthRepository
    {
        Task<GeneralResponseDto> SeedRolesAsync();
        Task<GeneralResponseDto> RegisterAsync(RegisterDto registerDto);

        Task<LoginResponseDto> LoginAsync(LoginDto loginDto);

        // Task<GeneralResponseDto> UpdateRoleAsync(ClaimsPrincipal User, Updaterole)

    }
}