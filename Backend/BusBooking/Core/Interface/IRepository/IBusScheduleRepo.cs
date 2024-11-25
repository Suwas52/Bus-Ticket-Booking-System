using BusBooking.Core.Model;

namespace BusBooking.Core.Interface.IRepository
{
    public interface IBusScheduleRepo
    {
        Task<IEnumerable<BusSchedule>> GetAllAsync();
        Task CreateAsync(BusSchedule model);

        Task UpdateAsync(BusSchedule model);

        Task<BusSchedule> GetByIdAsync(int id);

        Task DeleteAsync(int id);
    }
}
