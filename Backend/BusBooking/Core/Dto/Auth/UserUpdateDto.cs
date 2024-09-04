

using System.ComponentModel.DataAnnotations.Schema;

namespace BusBooking.Core.Dto.Auth
{
    public class UserUpdateDto
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }   

        public string Address { get; set; }
        public string? ProfilePicture { get; set; }

        public string? PhoneNumber { get; set; }

        public DateOnly? DateOfBirth { get; set; }

        public string? Gender { get; set; }

        [NotMapped]
        public IFormFile Image { get; set; }
    }
}