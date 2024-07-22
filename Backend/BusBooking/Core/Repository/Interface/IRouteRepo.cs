using BusBooking.Core.Model;

namespace BusBooking.Core.Repository.Interface
{
    public interface IRouteRepo
    {
        Task<IEnumerable<Routes>> GetAllAsync();
        Task CreateAsync(Routes model);
        Task UpdateAsync(Routes model);
        Task DeleteAsync(int id);
        Task<Routes> GetByIdAsync(int id);
    }
}
