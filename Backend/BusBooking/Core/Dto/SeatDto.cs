using BusBooking.Core.Model;
using static BusBooking.Core.Model.Seat;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BusBooking.Core.Dto
{
    public class SeatReadDto
    {
        public int SeatId { get; set; }
        public int BusId { get; set; }
        public string BusName { get; set; }
        public int SeatNumber { get; set; }
        public string SeatName { get; set; }

        public SeatStatus Status { get; set; }


        
    }
    
    public class SeatUpdateDto
    {
    }
}
