using System.ComponentModel.DataAnnotations;

namespace BusBooking.Core.Dto
{
    public class BusSearchDto
    {
        [Required]
        public string StartLocation { get; set; }

        [Required]
        public string EndLocation { get; set; }

        [Required]
        public DateTime DepartureTime { get; set; }
    }
}
