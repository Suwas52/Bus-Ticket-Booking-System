using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace BusBooking.Core.Model
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Address { get; set; }
        public string? ProfilePicture { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        [NotMapped]

        public IList<string> Roles { get; set; }

        [NotMapped]
        public IFormFile Image { get; set; }
    }
}