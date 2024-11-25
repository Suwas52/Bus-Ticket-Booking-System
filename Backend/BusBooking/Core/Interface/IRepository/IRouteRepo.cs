using BusBooking.Core.Model;

namespace BusBooking.Core.Interface.IRepository
{
    public interface IRouteRepo
    {
        Task<IEnumerable<Routes>> GetAllAsync();
        Task CreateAsync(Routes model);
        Task UpdateAsync(Routes model);
        Task DeleteAsync(int id);
        Task<Routes> GetByIdAsync(int id);


        Task<int> GetTotalRoutesCountAsync();
    }
}
