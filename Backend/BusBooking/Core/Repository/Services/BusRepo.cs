
using BusBooking.Core.Context;
using BusBooking.Core.Model;
using BusBooking.Core.Repository.Interface;

namespace BusBooking.Core.Repository.Services
{
    public class BusRepo : IBusRepo
    {
        private readonly ApplicationDbContext _context;

        public BusRepo(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task CreateAsync(Bus model)
        {
            await _context.Buses.AddAsync(model);
            await _context.SaveChangesAsync();
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