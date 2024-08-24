using BusBooking.Core.Model;

namespace BusBooking.Core.Dto
{
    public class AvailableBusDto
    {
        public int BusId { get; set; }
        public int ScheduleId { get; set; }
        public string BusName { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public BusTypes BusType { get; set; }
        public decimal Price { get; set; }
        public int Distance { get; set; }
        
    }
}
