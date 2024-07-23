using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BusBooking.Core.Model
{
    public class Seat
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SeatId { get; set; }

        [Required]
        [ForeignKey("Bus")]
        public int BusId { get; set; }

        [Required]
        public int SeatNumber { get; set; }

        public SeatStatus Status { get; set; }

        [JsonIgnore]
        public virtual Bus Bus { get; set; }

        public enum SeatStatus
        {
            Available,
            Booked,
            Unavailable
        }
    }
}
