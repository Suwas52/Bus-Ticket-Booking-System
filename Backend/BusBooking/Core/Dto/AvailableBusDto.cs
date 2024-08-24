namespace BusBooking.Core.Dto
{
    public class AvailableBusDto
    {
        public string BusName { get; set; }
        public DateTime DepartureTime { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
        /*public decimal Price { get; set; }
        public string SeatLayout { get; set; }
        public string Facilities { get; set; }*/
    }
}
