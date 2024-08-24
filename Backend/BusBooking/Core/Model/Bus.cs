using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using static BusBooking.Core.Model.Seat;

namespace BusBooking.Core.Model
{

    public class Bus
    {

        public Bus()
        {
            BusSchedules = new HashSet<BusSchedule>();
            
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BusId { get; set; }

        [Required]
        [StringLength(50)]
        public string BusName { get; set; }

        [Required]
        [StringLength(20)]
        public string BusNumber { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Capacity Must Be Greater than Zero.")]
        public int Capacity { get; set; }
        [Required]
        public BusTypes BusType { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }

        [JsonIgnore]
        public virtual ICollection<BusSchedule> BusSchedules  { get; set; }

        [JsonIgnore]
        public virtual ICollection<Seat> Seats { get; set; } = new List<Seat>();  
    
    }

    public enum BusTypes
    {
        AC,
        NonAC
    }
}