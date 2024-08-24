using BusBooking.Core.Dto;

namespace BusBooking.Core.Repository.Interface
{
    public interface ISeatRepo
    {
        Task<IEnumerable<SeatReadDto>> GetSeat(int busId);
    }
}
