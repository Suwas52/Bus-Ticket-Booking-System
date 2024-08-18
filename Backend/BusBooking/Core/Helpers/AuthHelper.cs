
using System.Security.Claims;

using BusBooking.Core.Model;
using Microsoft.AspNetCore.Identity;

namespace BusBooking.Core.Helpers
{
    public interface IAuthHelper
    {
        ApplicationUser GetCurrentUser();
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
        public ApplicationUser GetCurrentUser()
        {
            var user = _HttpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (user == null)
            {
                return null;
            }
            returnzz _userManager.Users.SingleOrDefault(u => u.Id == user);
        }
    }
}