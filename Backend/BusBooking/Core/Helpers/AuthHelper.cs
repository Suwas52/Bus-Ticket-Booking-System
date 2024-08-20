
using System.Security.Claims;

using BusBooking.Core.Model;
using Microsoft.AspNetCore.Identity;

namespace BusBooking.Core.Helpers
{
    public interface IAuthHelper
    {
        Task<ApplicationUser> GetCurrentUserAsync();
    }
    public class AuthHelper : IAuthHelper
    {
        private IHttpContextAccessor _HttpContextAccessor;
        private UserManager<ApplicationUser> _userManager;
        public AuthHelper(IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager)
        {
            _HttpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }
        public async Task<ApplicationUser> GetCurrentUserAsync()
        {
            var userId = _HttpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return null;
            }

            // Fetch the user from the database
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                // Fetch roles for the user
                var roles = await _userManager.GetRolesAsync(user);
                if (roles != null && roles.Any())
                {
                    user.Roles = roles.ToList();
                }
                else
                {
                    // Log or handle the case where no roles are found
                    // You could assign an empty list to avoid null reference issues
                    user.Roles = new List<string>();
                }
            }
            else
            {
                // Log or handle the case where the user is not found
                return null;
            }

            return user;
        }

    }
}