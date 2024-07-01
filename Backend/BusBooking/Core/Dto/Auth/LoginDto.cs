
using System.ComponentModel.DataAnnotations;


namespace BusBooking.Core.Dto.Auth
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Email is Required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is Requied")]
        public string Password { get; set; }
    }
}