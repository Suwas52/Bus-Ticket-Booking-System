using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusBooking.Core.Model
{
    public class Routes
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RouteId { get; set; }
        [Required]
        [StringLength(100, ErrorMessage = "Start location name cannot be longer than 100 characters.")]
        public string StartLocation { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "End location name cannot be longer than 100 characters.")]
        public string EndLocation { get; set; }
        [Required]
        public int Distance { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }
}
}
