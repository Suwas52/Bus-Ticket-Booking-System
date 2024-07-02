using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusBooking.Core.Model
{
    public class Bus
    {
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
    }

    public enum BusTypes
    {
        AC,
        NonAC
    }
}