
using System.ComponentModel.DataAnnotations;


namespace BusBooking.Core.Dto.Auth
{
    public class LoginDto
    {
        [Required(ErrorMessage = "UserName is Required")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password is Requied")]
        public string Password { get; set; }
    }
}