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
            var loginUser = _authHelper.GetCurrentUser();

            model.CreatedAt = DateTime.Now;
            model.CreatedBy = loginUser.UserName;
            model.IsDeleted = false;
            await _context.BusSchedules.AddAsync(model);
            await _context.SaveChangesAsync();
        }


        public async Task<IEnumerable<BusSchedule>> GetAllAsync()
        {
            return await _context.BusSchedules.Where(x => x.IsDeleted == false).ToListAsync();
        }

        public async Task<BusSchedule> GetByIdAsync(int id)
        {
            return await _context.BusSchedules.FindAsync(id).ConfigureAwait(false);
           
        }

        public async Task UpdateAsync(BusSchedule model)
        {
            var loginUser = _authHelper.GetCurrentUser();
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
            var loginUser = _authHelper.GetCurrentUser();
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
