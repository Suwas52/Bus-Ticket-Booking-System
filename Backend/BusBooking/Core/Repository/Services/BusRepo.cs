
using BusBooking.Core.Model;
using BusBooking.Core.Repository.Interface;

namespace BusBooking.Core.Repository.Services
{
    public class BusRepo : IBusRepo
    {
        public Task CreateAsync(Bus model)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Bus>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Bus> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Bus model)
        {
            throw new NotImplementedException();
        }
    }
}