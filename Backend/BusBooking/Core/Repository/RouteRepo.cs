using BusBooking.Core.Context;
using BusBooking.Core.Helpers;
using BusBooking.Core.Interface.IRepository;
using BusBooking.Core.Model;
using Microsoft.EntityFrameworkCore;

namespace BusBooking.Core.Repository
{
    public class RouteRepo : IRouteRepo
    {
        private readonly ApplicationDbContext _context;
        private readonly IAuthHelper _authHelper;
        public RouteRepo(ApplicationDbContext context, IAuthHelper authHelper)
        {
            _context = context;
            _authHelper = authHelper;
        }
        public async Task CreateAsync(Routes model)
        {
            var loginUser = await _authHelper.GetCurrentUserAsync();
            model.CreatedAt = DateTime.Now;
            model.CreatedBy = loginUser.UserName;
            model.IsDeleted = false;
            await _context.Routes.AddAsync(model);
            await _context.SaveChangesAsync().ConfigureAwait(false);
        }
        public async Task<IEnumerable<Routes>> GetAllAsync()
        {
            return await _context.Routes.Where(x => x.IsDeleted == false).ToListAsync();
        }

        public async Task<Routes> GetByIdAsync(int id)
        {
            var route = await _context.Routes.FindAsync(id).ConfigureAwait(false);
            return route;
        }

        public async Task UpdateAsync(Routes model)
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

            var route = await _context.Routes.FindAsync(id).ConfigureAwait(false);
            if (route != null)
            {
                route.IsDeleted = true;
                route.UpdatedBy = loginUser.UserName;
                route.UpdatedAt = DateTime.Now;
                _context.Entry(route).State = EntityState.Deleted;
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
        }

        public async Task<int> GetTotalRoutesCountAsync()
        {
            return await _context.Routes.Where(b => b.IsDeleted == false).CountAsync();
        }
    }
}
