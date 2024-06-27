
using BusBooking.Core.Context;
using BusBooking.Core.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace BusBooking.Core.Repository.Services
{
    public class GenericRepo<T, Tkey> : IGenericRepo<T, Tkey> where T : class
    {
        private readonly ApplicationDbContext _context;
        public GenericRepo(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<T> CreateAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(Tkey id)
        {
            if (id != null)
            {
                var data = await _context.Set<T>().FindAsync(id);
                _context.Remove(data);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<T>> SelectAllAsync()
        {
            var allData = await _context.Set<T>().ToListAsync();
            return allData;
        }

        public async Task<T> SelectByIdAsync(Tkey id)
        {
            if (id == null)
            {
                return null;
            }
            var dataDetails = await _context.Set<T>().FindAsync(id);
            return dataDetails;
        }

        public async Task<T> UpdateAsync(T entity)
        {
            if (entity == null)
            {
                return null;
            }

            _context.Set<T>().Update(entity);
            await _context.SaveChangesAsync();
            return entity;

        }
    }
}