using BusBooking.Core.Dto;

namespace BusBooking.Core.Interface.IRepository
{
    public interface ISeatRepo
    {
        Task<IEnumerable<SeatReadDto>> GetSeat(int busId);
    }
}
