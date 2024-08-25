using BusBooking.Core.Model;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BusBooking.Core.Dto
{
    public class BookingCreateDto
    {
        public int ScheduleId { get; set; }
        public int SeatId { get; set; }
        public string PassengerName { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
    }

    public class BookingUpdateDto
    {
        public int BookingId { get; set; }
        public string UserId { get; set; }
        public int ScheduleId { get; set; }
        public int SeatId { get; set; }
        public string PassengerName { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public BookingStatus Status { get; set; }
        public DateTime ApprovedDate { get; set; }
        public DateTime RejectedDate { get; set; }

        public DateTime BookingDate { get; set; }
        public string BookedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsDeleted { get; set; }
    }

    public class BookingReadDto
    {
        public int BookingId { get; set; }
        public string UserId { get; set; }
        public int ScheduleId { get; set; }
        public int SeatId { get; set; }
        public string PassengerName { get; set; }
        public string UserName { get; set; }
        public string BusName { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }

        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public int SeatNumber { get; set; }
        public string SeatName { get; set; }
        public decimal Price { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public BookingStatus Status { get; set; }
        public DateTime ApprovedDate { get; set; }
        public DateTime RejectedDate { get; set; }

        public DateTime BookingDate { get; set; }
        public string BookedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public bool IsDeleted { get; set; }
    }

    public class BookingCountDto
    {
        public int TotalBookingCount { get; set; }
        public int AcceptedCount { get; set; }
        public int RejectedCount { get; set; }
    }

}
