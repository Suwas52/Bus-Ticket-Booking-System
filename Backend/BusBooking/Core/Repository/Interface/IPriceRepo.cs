using BusBooking.Core.Model;

namespace BusBooking.Core.Repository.Interface
{
    public interface IPriceRepo
    {
        Task<IEnumerable<Price>> GetAllAsync();
        Task CreateAsync(Price model);

        Task UpdateAsync(Price model);

        Task<Price> GetByIdAsync(int id);

        Task DeleteAsync(int id);
    }
}
