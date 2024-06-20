using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusBooking.Core.Model
{
    public class Log : BaseEntity<int>
    {
        public string? UserName { get; set; }
        public string Description { get; set; }
    }
}