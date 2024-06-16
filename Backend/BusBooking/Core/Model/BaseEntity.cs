using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusBooking.Core.Model
{
    public class BaseEntity<TID>
    {
        public TID Id { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }
    }
}