using BusBooking.Core.Dto.General;
using BusBooking.Core.Model;

namespace BusBooking.Core.Repository.Interface
{
    public interface IBookingRepo
    {
        Task<IEnumerable<Booking>> GetAllAsync(string? userId = null);

        Task<GeneralResponseDto> CreateAsync(Booking model);

        Task<GeneralResponseDto> ApproveAsync(int id);

        Task<GeneralResponseDto> RejectAsync(int id);

        Task UpdateAsync(Booking model);

        Task<Booking> GetByIdAsync(int id);

        Task DeleteAsync(int id);
    }
}
