using BusBooking.Core.Context;
using BusBooking.Core.Helpers;
using BusBooking.Core.Model;
using BusBooking.Core.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace BusBooking.Core.Repository.Services
{
    public class PriceRepo : IPriceRepo
    {
        private readonly ApplicationDbContext _context;
        private readonly IAuthHelper _authHelper;
        public PriceRepo(ApplicationDbContext context, IAuthHelper authHelper)
        {
            _context = context;
            _authHelper = authHelper;
        }
        public async Task CreateAsync(Price model)
        {
            var loginUser = await _authHelper.GetCurrentUserAsync();

            model.CreatedAt = DateTime.Now;
            model.CreatedBy = loginUser.UserName;
            model.IsDeleted = false;
            await _context.Prices.AddAsync(model);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<Price>> GetAllAsync()
        {
            return await _context.Prices
                .Include(r => r.Route)
                .Where(x => x.IsDeleted == false).ToListAsync();
        }



        public async Task<Price> GetByIdAsync(int id)
        {
            return await _context.Prices
                .Include(p => p.Route)
                .FirstOrDefaultAsync(p => p.PriceId == id && p.IsDeleted == false);
        }

        public async Task UpdateAsync(Price model)
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
            var price = await _context.Prices.FindAsync(id).ConfigureAwait(false);
            if (price != null)
            {
                price.IsDeleted = true;
                price.UpdatedBy = loginUser.UserName;
                price.UpdatedAt = DateTime.Now;

                _context.Entry(price).State = EntityState.Modified;
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
        }
    }
}
