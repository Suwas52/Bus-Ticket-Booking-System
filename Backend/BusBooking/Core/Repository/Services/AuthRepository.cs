
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using BusBooking.Constants;
using BusBooking.Core.Dto.Auth;
using BusBooking.Core.Dto.General;
using BusBooking.Core.Helpers;
using BusBooking.Core.Model;
using BusBooking.Core.Repository.Interface;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MimeKit;

namespace BusBooking.Core.Repository.Services
{
    public class AuthRepository : IAuthRepository
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly ILogService logService;
        private readonly IConfiguration configuration;
        private readonly ILogger<AuthRepository> _logger;
        private readonly IAuthHelper _authHelper;
        private readonly IFileService _fileService;


        public AuthRepository(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ILogService logService, IConfiguration configuration, ILogger<AuthRepository> logger, IAuthHelper authHelper, IFileService fileService)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.logService = logService;
            this.configuration = configuration;
            _logger = logger;
            _authHelper = authHelper;
            _fileService = fileService;
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
            var existingUsername = await userManager.FindByNameAsync(registerDto.UserName);
            var existingEmail = await userManager.FindByEmailAsync(registerDto.Email);



            if (existingUsername != null || !existingUsername.IsDeleted)
            {
                return new GeneralResponseDto
                {
                    IsSucceed = false,
                    StatusCode = 409,
                    Message = "Username already exists."
                };
            }

            if(existingEmail != null || !existingEmail.IsDeleted)
            {
                return new GeneralResponseDto
                {
                    IsSucceed = false,
                    StatusCode = StatusCodes.Status404NotFound,
                    Message ="This User Email is already existed !"
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
            if (!createUserResult.Succeeded)
            {
                var errorMessage = "User Creationg Faild " + string.Join(", ", createUserResult.Errors.Select(e => e.Description));
                return new GeneralResponseDto
                {
                    IsSucceed = false,
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = errorMessage
                };
            }
            var token = await userManager.GenerateEmailConfirmationTokenAsync(newUser);
            var encodedToken = WebUtility.UrlEncode(token);


            var confirmationLink = $"{configuration["AppSettings:BaseUrl"]}/api/Auth/confirmemail?userId={newUser.Id}&token={encodedToken}";


            var MailBody = $"Please confirm your email by clicking <a href='{confirmationLink}'>Confirm Email</a>.";


            EmailHelper.SendEmail(
                registerDto.Email,
                "Confirm your email",
                MailBody,
                SendEvenIfNotificationDisabled: true
                );


            await userManager.AddToRoleAsync(newUser, StaticRoleUser.USER);
            await logService.SaveNewLog(newUser.UserName, "Registered to Website");

            return new GeneralResponseDto
            {
                IsSucceed = true,
                StatusCode = 200,
                Message = "User created successfully. Please check your email to confirm."
            };
        }


        public async Task<GeneralResponseDto> ConfirmEmailAsync(string userId, string token)
        {
            if(string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(token))
            {
                return new GeneralResponseDto
                {
                    IsSucceed = false,
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = "Invalid Email Confirmation !"
                };
            }

            var user = await userManager.FindByIdAsync(userId);

            if(user == null)
            {
                return new GeneralResponseDto
                {
                    IsSucceed = false,
                    Message = "User is not found",
                    StatusCode = StatusCodes.Status404NotFound,
                };
            }

            string decodeToken = WebUtility.UrlEncode(token);
            decodeToken = decodeToken.Replace(" ", "+");

            var result = await userManager.ConfirmEmailAsync(user, decodeToken);

            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                return new GeneralResponseDto
                {
                    IsSucceed = false,
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = $"Email confirmation failed: {errors}"
                };
            }

            user.IsActive = true;

            await userManager.UpdateAsync(user);

            return new GeneralResponseDto
            {
                IsSucceed = true,
                StatusCode = StatusCodes.Status200OK,
                Message = "Email Confirm Successfully"
            };

        }

        private string SendEmail(string email, string emailCode)
        {
            StringBuilder emailMessage = new StringBuilder();
            emailMessage.AppendLine("<html>");
            emailMessage.AppendLine("<body>");
            emailMessage.AppendLine($"<p>Dear {email}, </p>");
            emailMessage.AppendLine($"<p>Thank you for registering with us. To verify your email</p>");
            emailMessage.AppendLine($"<h2>Verification Code: {emailCode}</h2>");
            emailMessage.AppendLine("<p>Best regards,</p>");
            emailMessage.AppendLine("</body>");
            emailMessage.AppendLine("</html>");

            string message = emailMessage.ToString();
            var _email = new MimeMessage();
            _email.To.Add(MailboxAddress.Parse("raphaelle.zemlak39@ethereal.email"));
            _email.From.Add(MailboxAddress.Parse("raphaelle.zemlak39@ethereal.email"));
            _email.Subject = "Email Confirmation";
            _email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = message };

            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            smtp.Connect("smtp.ethereal.email", 587, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate("raphaelle.zemlak39@ethereal.email", "BER7gyZSJ98SeneYna");
            smtp.Send(_email);
            smtp.Disconnect(true);
            return "Thank you for your registration, kindly check your email for confirmation code";
        }

        public async Task<LoginResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await userManager.FindByEmailAsync(loginDto.Email);

            if (user == null || user.IsDeleted)
            {
                return new LoginResponseDto
                {
                    ErrorMessage = "User not found."
                };
            }

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

        public async Task<GeneralResponseDto> ChangePasswordAsync(string userName, ChangePasswordDto model)
        {
            var user = await userManager.FindByNameAsync(userName);

            if(user == null)
            {
                return new GeneralResponseDto
                {
                    IsSucceed=false,
                    StatusCode = StatusCodes.Status404NotFound,
                    Message = "User not found"
                };
            }

            var result = await userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
            if (!result.Succeeded)
            {
                return new GeneralResponseDto
                {
                    IsSucceed=false,
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = string.Join(", ", result.Errors.Select(e => e.Description))
                };
            }

            return new GeneralResponseDto
            {
                IsSucceed = true,
                StatusCode = StatusCodes.Status200OK,
                Message = "User Password Update Successfully"
            };
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

        /*public async Task SendEmailAsync(string toEmail, string subject, string message)
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
*/

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
                Gender = user.Gender,
                Address = user.Address,
                PhoneNumber = user.PhoneNumber,
                DateOfBirth = user.DateOfBirth,
                ProfilePicture = user.ProfilePicture,
                Roles = Roles,
                CreatedAt = user.CreatedAt,
            };
        }

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

        public async Task<GeneralResponseDto> UpdateUserAsync(UserUpdateDto model, string userName)
        {
            var currentUser = await _authHelper.GetCurrentUserAsync();
            var userToUpdate = await userManager.FindByNameAsync(userName);

            if (userToUpdate == null || userToUpdate.IsDeleted)
            {
                return new GeneralResponseDto
                {
                    IsSucceed = false,
                    StatusCode = StatusCodes.Status404NotFound,
                    Message = "User not found."
                };
            }

            // Check if the current user is the same as the user to be updated or has admin privileges
            if (currentUser.UserName != userToUpdate.UserName && !(await userManager.IsInRoleAsync(currentUser, StaticRoleUser.ADMIN) || await userManager.IsInRoleAsync(currentUser, StaticRoleUser.SUPERADMIN)))
            {
                return new GeneralResponseDto
                {
                    IsSucceed = false,
                    StatusCode = StatusCodes.Status403Forbidden,
                    Message = "You are not authorized to update this user's information."
                };
            }


            // Update allowed fields
            userToUpdate.FirstName = model.FirstName;
            userToUpdate.LastName = model.LastName;
            userToUpdate.PhoneNumber = model.PhoneNumber;
            userToUpdate.Address = model.Address;
            userToUpdate.Gender = model.Gender;
            userToUpdate.UpdatedAt = DateTime.UtcNow;
            userToUpdate.UpdatedBy = currentUser.UserName;

            // Handle profile picture upload if provided
            if (model.Image != null && model.Image.Length > 0)
            {
                var fileResult = _fileService.SaveFile(model.Image);
                if (fileResult.Item1 == 1)
                {
                    userToUpdate.ProfilePicture = Path.Combine("http://localhost:5245/Uploads", fileResult.Item2);
                }
               /* else
                {
                    return new GeneralResponseDto
                    {
                        IsSucceed = false,
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "Failed to upload profile picture."
                    };
                }*/
            }

            var result = await userManager.UpdateAsync(userToUpdate);
            if (!result.Succeeded)
            {
                return new GeneralResponseDto
                {
                    IsSucceed = false,
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = "Failed to update user information."
                };
            }

            return new GeneralResponseDto
            {
                IsSucceed = true,
                StatusCode = StatusCodes.Status200OK,
                Message = "User information updated successfully."
            };
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