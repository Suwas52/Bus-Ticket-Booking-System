using BusBooking.Core.Context;
using BusBooking.Core.Helpers;
using BusBooking.Core.Model;
using BusBooking.Core.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace BusBooking.Core.Repository.Services
{
    public class BusScheduleRepo : IBusScheduleRepo
    {
        private readonly ApplicationDbContext _context;
        private readonly IAuthHelper _authHelper;
        public BusScheduleRepo(ApplicationDbContext context, IAuthHelper authHelper)
        {
            _context = context; 
            _authHelper = authHelper;
        }
        public async Task CreateAsync(BusSchedule model)
        {
            var loginUser = await _authHelper.GetCurrentUserAsync();

            model.CreatedAt = DateTime.Now;
            model.CreatedBy = loginUser.UserName;
            model.IsDeleted = false;
            await _context.BusSchedules.AddAsync(model);
            await _context.SaveChangesAsync();
        }


        public async Task<IEnumerable<BusSchedule>> GetAllAsync()
        {
            return await _context.BusSchedules
                .Include(bs => bs.Bus)
                .Include(bs => bs.Routes)
                .Where(x => x.IsDeleted == false).ToListAsync();
        }

        public async Task<BusSchedule> GetByIdAsync(int id)
        {
            return await _context.BusSchedules
                .Include(bs => bs.Bus)
                .Include(bs => bs.Routes)
                .FirstOrDefaultAsync(bs => bs.ScheduleId == id && bs.IsDeleted == false);

        }

        public async Task UpdateAsync(BusSchedule model)
        {
            var loginUser = await _authHelper.GetCurrentUserAsync();
            if (model.IsDeleted == false)
            {
                model.UpdatedAt = DateTime.Now;
                model.UpdatedBy = loginUser.UserName;
                _context.Entry(model).State = EntityState.Modified;
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
        }
        public async Task DeleteAsync(int id)
        {
            var loginUser = await _authHelper.GetCurrentUserAsync();
            var schedule = await _context.BusSchedules.FindAsync(id).ConfigureAwait(false);
            if (schedule != null)
            {
                schedule.IsDeleted = true;
                schedule.UpdatedBy = loginUser.UserName;
                schedule.UpdatedAt = DateTime.Now;

                _context.Entry(schedule).State = EntityState.Modified;
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
        }
    }
}
