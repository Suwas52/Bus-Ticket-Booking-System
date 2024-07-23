using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BusBooking.Core.Model
{
    public class Booking
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BookingId { get; set; }

        [Required]
        [ForeignKey("User")]
        public string UserId { get; set; }

        [Required]
        [ForeignKey("BusSchedule")]
        public int ScheduleId { get; set; }

        [Required]
        [ForeignKey("Seat")]
        public int SeatId { get; set; }


        [Required]
        [StringLength(100)]
        public string PassengerName { get; set; }

        [Required]  
        public int Age { get; set; }

        [Required]
        public string Gender { get; set; }

        public BookingStatus Status { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public DateTime? RejectedDate { get; set; }

        public DateTime BookingDate { get; set; }
        public string BookedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? UpdatedBy { get; set; }

        public bool IsDeleted { get; set; }

        [JsonIgnore]
        public virtual ApplicationUser User { get; set; }

        [JsonIgnore]
        public virtual BusSchedule BusSchedule { get; set; }

        [JsonIgnore]
        public virtual Seat Seat { get; set; }

    }

    public enum BookingStatus
    {
        Pending,
        Approved,
        Rejected
    }
}
