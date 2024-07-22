using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BusBooking.Core.Model
{
    public class BusSchedule
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]   
        public int ScheduleId { get; set; }

        [Required]
        [ForeignKey("Bus")]
        public int BusId { get; set; }

        [Required]
        [ForeignKey("Routes")]
        public int RouteId { get; set; }

        [Required]
        public DateTime DepartureTime { get; set; }

        [Required]
        public DateTime ArrivalTime { get; set; }

        public string? FrequencyDay { get; set; }

        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? UpdatedBy { get; set; }
        public bool IsDeleted { get; set; }

        [JsonIgnore]
        public virtual Bus Bus  { get; set; }

        [JsonIgnore]
        public virtual Routes Routes { get; set; }


    }
}
