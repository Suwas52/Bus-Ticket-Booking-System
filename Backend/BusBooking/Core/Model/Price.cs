using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusBooking.Core.Model
{
    public class Price
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PriceId { get; set; }

        [Required]
        [ForeignKey("Route")]
        public int RouteId { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage ="Base Price must be Positive value.")]
        public decimal BasePrice { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }
        public virtual Routes Route { get; set; }
    }
}
