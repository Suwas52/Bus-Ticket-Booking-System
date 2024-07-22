using System.ComponentModel.DataAnnotations;

namespace BusBooking.Core.Dto
{
    public class RouteCreateDto
    {
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
        public int Distance { get; set; }
    }

    public class RouteUpdateDto
    {
        public int RouteId { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
        public int Distance { get; set; }
    }

    public class RouteReadDto
    {
        public int RouteId { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
        public int Distance { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }
    }
}
