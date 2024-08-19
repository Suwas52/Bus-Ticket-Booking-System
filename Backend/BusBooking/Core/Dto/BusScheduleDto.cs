using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BusBooking.Core.Dto
{
    public class BusScheduleCreateDto
    {

        public int BusId { get; set; }
        public int RouteId { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public string FrequencyDay { get; set; }
    }
    public class BusScheduleUpdateDto
    {
        public int BusId { get; set; }
        public int RouteId { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public string FrequencyDay { get; set; }
    }

    public class BusScheduleReadDto
    {
        public int ScheduleId { get; set; }
        public int BusId { get; set; }
        public int RouteId { get; set; }
        public string BusName { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public string FrequencyDay { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsDeleted { get; set; }
    }
}
