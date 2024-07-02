

namespace BusBooking.Core.Dto
{
    public class BusReadDto
    {
        public int BusId { get; set; }
        public string BusName { get; set; }
        public string BusNumber { get; set; }
        public int Capacity { get; set; }
        public int BusType { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }
    }

    public class BusCreateDto
    {
        public string BusName { get; set; }
        public string BusNumber { get; set; }
        public int Capacity { get; set; }
        public int BusType { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public bool IsDeleted { get; set; }
    }

    public class BusUpdateDto
    {
        public int BusId { get; set; }
        public string BusName { get; set; }
        public string BusNumber { get; set; }
        public int Capacity { get; set; }
        public int BusType { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }
    }
}