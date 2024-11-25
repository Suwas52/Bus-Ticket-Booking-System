using BusBooking.Core.Model;

namespace BusBooking.Core.Interface.IRepository
{
    public interface IBusRepo
    {
        Task<IEnumerable<Bus>> GetAllAsync();
        Task CreateAsync(Bus model);

        Task UpdateAsync(Bus model);

        Task<Bus> GetByIdAsync(int id);

        Task DeleteAsync(int id);

        Task<int> GetTotalBusCount();
    }
}