
using BusBooking.Core.Context;
using BusBooking.Core.Helpers;
using BusBooking.Core.Model;
using BusBooking.Core.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using static BusBooking.Core.Model.Seat;

namespace BusBooking.Core.Repository.Services
{
    public class BusRepo : IBusRepo
    {
        private readonly ApplicationDbContext _context;
        private readonly IAuthHelper _authHelper;

        public BusRepo(ApplicationDbContext context, IAuthHelper authHelper)
        {
            _context = context;
            _authHelper = authHelper;
        }

        public async Task CreateAsync(Bus model)
        {
            var loginUser = _authHelper.GetCurrentUser();

            model.CreatedAt = DateTime.Now;
            model.CreatedBy = loginUser.UserName;
            model.IsDeleted = false;

            
            await _context.Buses.AddAsync(model);
            await _context.SaveChangesAsync();

            // Initialize seats
            for (int i = 1; i <= model.Capacity; i++)
            {
                var seat = new Seat
                {
                    BusId = model.BusId,
                    SeatNumber = i,
                    Status = SeatStatus.Booked
                };
                await _context.Seats.AddAsync(seat);
            }

            await _context.SaveChangesAsync();
        }


        public async Task<IEnumerable<Bus>> GetAllAsync()
        {
            var buses = await _context.Buses.Where(x => x.IsDeleted == false).ToListAsync();
            return buses;
        }

        public async Task<Bus> GetByIdAsync(int id)
        {
            var busData = await _context.Buses.FindAsync(id).ConfigureAwait(false);
            return busData;
        }

        public async Task UpdateAsync(Bus model)
        {
            var loginUser = _authHelper.GetCurrentUser();
            if(model.IsDeleted == false)
            {
                model.UpdatedAt = DateTime.Now;
                model.UpdatedBy = loginUser.UserName;
                _context.Entry(model).State = EntityState.Modified;
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
        }

        public async Task DeleteAsync(int id)
        {
            var loginUser = _authHelper.GetCurrentUser();
            var bus = await _context.Buses.FindAsync(id).ConfigureAwait(false);
            if(bus != null)
            {
                bus.IsDeleted = true;
                bus.UpdatedBy = loginUser.UserName;
                bus.UpdatedAt = DateTime.Now;

                _context.Entry(bus).State = EntityState.Modified;
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
        }
    }
}