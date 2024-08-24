using BusBooking.Core.Model;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BusBooking.Core.Dto
{
    public class PriceReadDto
    {
        public int PriceId { get; set; }
        public int RouteId { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
        public decimal BasePrice { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }
    }

    public class PriceCreateDto
    {
        public int RouteId { get; set; }
        public decimal BasePrice { get; set; }
    }

    public class PriceUpdateDto 
    {
        public int RouteId { get; set; }
        public decimal BasePrice { get; set; }
    }
}
