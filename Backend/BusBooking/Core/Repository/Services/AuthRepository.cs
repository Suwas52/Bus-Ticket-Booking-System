using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BusBooking.Constants;
using BusBooking.Core.Dto.Auth;
using BusBooking.Core.Dto.General;
using BusBooking.Core.Model;
using BusBooking.Core.Repository.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace BusBooking.Core.Repository.Services
{
    public class AuthRepository : IAuthRepository
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly ILogService logService;
        private readonly IConfiguration configuration;

        public AuthRepository(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ILogService logService, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.logService = logService;
            this.configuration = configuration;
        }
        public async Task<GeneralResponseDto> SeedRolesAsync()
        {
            bool isOwnerExists = await roleManager.RoleExistsAsync(StaticRoleUser.SUPERADMIN);
            bool isAdminExists = await roleManager.RoleExistsAsync(StaticRoleUser.ADMIN);
            bool isManagerExists = await roleManager.RoleExistsAsync(StaticRoleUser.STAFF);
            bool isUserRoleExists = await roleManager.RoleExistsAsync(StaticRoleUser.USER);

            if (isOwnerExists && isAdminExists && isManagerExists && isUserRoleExists)
                return new GeneralResponseDto()
                {
                    IsSucceed = true,
                    StatusCode = 200,
                    Message = "Roles Seeding is Already Done",
                };

            await roleManager.CreateAsync(new IdentityRole(StaticRoleUser.SUPERADMIN));
            await roleManager.CreateAsync(new IdentityRole(StaticRoleUser.ADMIN));
            await roleManager.CreateAsync(new IdentityRole(StaticRoleUser.STAFF));
            await roleManager.CreateAsync(new IdentityRole(StaticRoleUser.USER));


            return new GeneralResponseDto()
            {
                IsSucceed = true,
                StatusCode = 201,
                Message = "Roles Seeding Done Successfully",
            };
        }


        public async Task<GeneralResponseDto> RegisterAsync(RegisterDto registerDto)
        {
            var isExitsUser = await userManager.FindByNameAsync(registerDto.UserName);

            if (isExitsUser is not null)
                return new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 409,
                    Message = "Username is alread Exists"
                };
            ApplicationUser newUser = new ApplicationUser()
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                UserName = registerDto.UserName,
                Email = registerDto.Email,
                Address = registerDto.Address,
                SecurityStamp = Guid.NewGuid().ToString(),
            };

            var createUserResult = await userManager.CreateAsync(newUser, registerDto.Password);

            if (!createUserResult.Succeeded)
            {
                var errorString = "User Creation faild because: ";

                foreach (var error in createUserResult.Errors)
                {
                    errorString += " # " + error.Description;
                }

                return new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 400,
                    Message = errorString,
                };
            }

            await userManager.AddToRoleAsync(newUser, StaticRoleUser.USER);
            await logService.SaveNewLog(newUser.UserName, "Registered to Website");

            return new GeneralResponseDto()
            {
                IsSucceed = true,
                StatusCode = 200,
                Message = "User Created Successfully",
            };
        }
        public async Task<LoginResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await userManager.FindByNameAsync(loginDto.UserName);

            if (user == null)
                return null;

            var isPasswordCorrect = await userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!isPasswordCorrect)
                return null;

            var newToken = await GenerateJWTTokenAsync(user);

            var roles = await userManager.GetRolesAsync(user);

            var userInfo = UserInfoObject(user, roles);

            await logService.SaveNewLog(user.UserName, "New Token Generated");

            return new LoginResponseDto()
            {
                NewToken = newToken,
                UserInfo = userInfo
            };
        }

        private async Task<string> GenerateJWTTokenAsync(ApplicationUser user)
        {
            var userRoles = await userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim(ClaimTypes.NameIdentifier, user.Id),
        new Claim("FirstName", user.FirstName),
        new Claim("LastName", user.LastName),
    };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var authSecret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
            var signingCredentials = new SigningCredentials(authSecret, SecurityAlgorithms.HmacSha256);

            var tokenObject = new JwtSecurityToken(
                issuer: configuration["JWT:ValidIssuer"],
                audience: configuration["JWT:ValidAudience"],
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: signingCredentials
                );

            string token = new JwtSecurityTokenHandler().WriteToken(tokenObject);
            return token;
        }

        private UserInformation UserInfoObject(ApplicationUser user, IEnumerable<string> Roles)
        {
            return new UserInformation()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                Roles = Roles
            };
        }


    }
}