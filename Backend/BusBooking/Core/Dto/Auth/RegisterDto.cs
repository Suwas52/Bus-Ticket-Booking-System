using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusBooking.Core.Dto.Auth
{
    public class RegisterDto
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string? Address { get; set; }

        public string UserName { get; set; }


    }
}