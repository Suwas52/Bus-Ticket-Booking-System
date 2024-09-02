
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using BusBooking.Constants;
using BusBooking.Core.Dto.Auth;
using BusBooking.Core.Dto.General;
using BusBooking.Core.Model;
using BusBooking.Core.Repository.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace BusBooking.Core.Repository.Services
{
    public class AuthRepository : IAuthRepository
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly ILogService logService;
        private readonly IConfiguration configuration;
        private readonly ILogger<AuthRepository> _logger;


        public AuthRepository(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ILogService logService, IConfiguration configuration, ILogger<AuthRepository> logger)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.logService = logService;
            this.configuration = configuration;
            _logger = logger;
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
            var existingUser = await userManager.FindByNameAsync(registerDto.UserName);
            if (existingUser != null)
            {
                return new GeneralResponseDto
                {
                    IsSucceed = false,
                    StatusCode = 409,
                    Message = "Username already exists."
                };
            }

            var newUser = new ApplicationUser
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                UserName = registerDto.UserName,
                Email = registerDto.Email,
                Address = registerDto.Address,
                IsActive = false,
                IsDeleted = false,
                SecurityStamp = Guid.NewGuid().ToString(),
                EmailConfirmed = false
            };

            var createUserResult = await userManager.CreateAsync(newUser, registerDto.Password);
/*
            if (createUserResult.Succeeded)
            {
                var token = await userManager.GenerateEmailConfirmationTokenAsync(newUser);
                var confirmationLink = $"{configuration["AppUrl"]}/api/auth/confirm-email?userId={newUser.Id}&token={Uri.EscapeDataString(token)}";
                *//*await SendEmailAsync(newUser.Email, "Confirm your email", $"Please confirm your email by clicking on this link: {confirmationLink}");*//*
                await SendEmailAsync("recipient@example.com", "Welcome to BusBooking!", "<h1>Hello!</h1><p>Thank you for registering.</p>");


            }*/

            await userManager.AddToRoleAsync(newUser, StaticRoleUser.USER);
            await logService.SaveNewLog(newUser.UserName, "Registered to Website");

            return new GeneralResponseDto
            {
                IsSucceed = true,
                StatusCode = 200,
                Message = "User created successfully. Please check your email to confirm."
            };
        }
        /*if (!createUserResult.Succeeded)
           {
               var errorString = "User creation failed: " + string.Join(", ", createUserResult.Errors.Select(e => e.Description));
               return new GeneralResponseDto
               {
                   IsSucceed = false,
                   StatusCode = 400,
                   Message = errorString,
               };
           }*/

        // var token = await userManager.GenerateEmailConfirmationTokenAsync(newUser);
        //     // var param = new Dictionary<string, string?>
        //     // {
        //     //     {"token" , token},
        //     //     {"email",newUser.Email}
        //     // };
        //     // var callback = QueryHelpers.AddQueryString(registerDto.EmailConfirmed, param);
        //     // var message = new Message([newUser.Email], "Email Confirmed Token", callback, null);

        // var token = await userManager.GenerateEmailConfirmationTokenAsync(newUser);
        // var confirmationLink = $"{configuration["AppUrl"]}/api/auth/confirm-email?userId={newUser.Id}&token={WebUtility.UrlEncode(token)}";

        // await SendUserEmailAsync(newUser.Email, "Email Confirmation", $"Please confirm your email by clicking this link: {confirmationLink}");



        public async Task<LoginResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await userManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
                return null;

            /*if (!await userManager.IsEmailConfirmedAsync(user))
            {
                return new LoginResponseDto()
                {
                    ErrorMessage = "Email is not confirmed"
                };
            }*/

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

        public async Task<GeneralResponseDto> UpdateRoleAsync(ClaimsPrincipal User, UpdateRoleDto updateRoleDto)
        {
            var user = await userManager.FindByNameAsync(updateRoleDto.UserName);
            if (user is null)
                return new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 404,
                    Message = "Invalid UserName"
                };

            var userRoles = await userManager.GetRolesAsync(user);
            // Just The OWNER and ADMIN can update roles
            if (User.IsInRole(StaticRoleUser.ADMIN))
            {
                // User is admin
                if (updateRoleDto.NewRole == RoleType.USER || updateRoleDto.NewRole == RoleType.STAFF)
                {
                    // admin can change the role of everyone except for owners and admins
                    if (userRoles.Any(q => q.Equals(StaticRoleUser.SUPERADMIN) || q.Equals(StaticRoleUser.ADMIN)))
                    {
                        return new GeneralResponseDto()
                        {
                            IsSucceed = false,
                            StatusCode = 403,
                            Message = "You are not allowed to change role of this user"
                        };
                    }
                    else
                    {
                        await userManager.RemoveFromRolesAsync(user, userRoles);
                        await userManager.AddToRoleAsync(user, updateRoleDto.NewRole.ToString());
                        /*await _logService.SaveNewLog(user.UserName, "User Roles Updated");*/
                        return new GeneralResponseDto()
                        {
                            IsSucceed = true,
                            StatusCode = 200,
                            Message = "Role updated successfully"
                        };
                    }
                }
                else return new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 403,
                    Message = "You are not allowed to change role of this user"
                };
            }
            else
            {
                // user is owner
                if (userRoles.Any(q => q.Equals(StaticRoleUser.SUPERADMIN)))
                {
                    return new GeneralResponseDto()
                    {
                        IsSucceed = false,
                        StatusCode = 403,
                        Message = "You are not allowed to change role of this user"
                    };
                }
                else
                {
                    await userManager.RemoveFromRolesAsync(user, userRoles);
                    await userManager.AddToRoleAsync(user, updateRoleDto.NewRole.ToString());
                    /*await _logService.SaveNewLog(user.UserName, "User Roles Updated");*/

                    return new GeneralResponseDto()
                    {
                        IsSucceed = true,
                        StatusCode = 200,
                        Message = "Role updated successfully"
                    };
                }
            }
        }


        public async Task<LoginResponseDto?> MeAsync(MeDto meDto)
        {
            ClaimsPrincipal handler = new JwtSecurityTokenHandler().ValidateToken(meDto.Token, new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidIssuer = configuration["JWT:ValidIssuer"],
                ValidAudience = configuration["JWT:ValidAudience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
            }, out SecurityToken securityToken);

            string decodedUserName = handler.Claims.First(q => q.Type == ClaimTypes.Name).Value;
            if (decodedUserName is null)
                return null;

            var user = await userManager.FindByNameAsync(decodedUserName);
            if (user is null)
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


        /* private async Task SendEmailAsync(string toEmail, string subject, string message)
         {
             var smtpClient = new SmtpClient
             {
                 Host = configuration["Smtp:Host"], // Ensure this is not null
                 Port = int.Parse(configuration["Smtp:Port"]),
                 Credentials = new NetworkCredential(configuration["Smtp:Username"], configuration["Smtp:Password"]),
                 EnableSsl = true,
             };


             var mailMessage = new MailMessage
             {
                 From = new MailAddress(configuration["Smtp:FromEmail"], configuration["Smtp:FromName"]),
                 Subject = subject,
                 Body = message,
                 IsBodyHtml = true
             };
             mailMessage.To.Add(toEmail);

             await smtpClient.SendMailAsync(mailMessage);
         }*/

        public async Task SendEmailAsync(string toEmail, string subject, string message)
        {
            try
            {
                // Create a new MailMessage object
                var mailMessage = new MailMessage
                {
                    From = new MailAddress("your-email@example.com", "Your Name"),
                    Subject = subject,
                    Body = message,
                    IsBodyHtml = true
                };

                // Add the recipient
                mailMessage.To.Add(toEmail);

                // Set up the SMTP client
                using (var smtpClient = new SmtpClient("smtp.example.com", 587)) // Replace with your SMTP server and port
                {
                    smtpClient.Credentials = new NetworkCredential("your-email@example.com", "your-password"); // Replace with your email and password
                    smtpClient.EnableSsl = true; // Set to true if your SMTP server requires SSL

                    // Send the email asynchronously
                    await smtpClient.SendMailAsync(mailMessage);
                }
            }
            catch (SmtpException ex)
            {
                // Log the detailed error message
                Console.WriteLine($"SMTP Error: {ex.Message}");
                throw new Exception("There was an error sending the email. Please try again later.");
            }
            catch (Exception ex)
            {
                // Log the detailed error message
                Console.WriteLine($"General Error: {ex.Message}");
                throw;
            }
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

        /*public Task<GeneralResponseDto> UpdateUserAsync(UserUpdateDto model)
        {
            
        }*/

        public async Task<IEnumerable<UserInformation>> UserListAsync()
        {
            var users = await userManager.Users.ToListAsync();

            List<UserInformation> userInfoResults = new List<UserInformation>();

            foreach (var user in users)
            {
                var roles = await userManager.GetRolesAsync(user);
                var userInfo = UserInfoObject(user, roles);
                userInfoResults.Add(userInfo);
            }

            return userInfoResults;
        }

        public async Task<UserInformation> GetUserDetailsByUserNameAsync(string username)
        {
            var user = await userManager.FindByNameAsync(username);

            if (user is null)
                return null;

            var roles = await userManager.GetRolesAsync(user);
            var userInfo = UserInfoObject(user, roles);
            return userInfo;

        }

        public async Task<int> GetTotalUsersCountAsync()
        {
            return await userManager.Users.Where(b => b.IsDeleted == false).CountAsync();
        }
    }
}