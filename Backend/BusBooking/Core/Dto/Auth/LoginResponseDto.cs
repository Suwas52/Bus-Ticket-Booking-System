using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace BusBooking.Core.Dto.Auth
{
    public class LoginResponseDto
    {
        public string NewToken { get; set; }

        public UserInformation UserInfo { get; set; }
        public string ErrorMessage { get; set; }
    }
}