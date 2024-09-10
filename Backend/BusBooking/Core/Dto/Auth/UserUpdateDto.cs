using static BusBooking.Core.Model.ApplicationUser;

namespace BusBooking.Core.Dto.Auth
{
    public class UserUpdateDto
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Address { get; set; }
        public string? PhoneNumber { get; set; }
        /*
                public DateOnly? DateOfBirth { get; set; }*/

        public string? Gender { get; set; }
        public IFormFile? Image { get; set; }
    }
}