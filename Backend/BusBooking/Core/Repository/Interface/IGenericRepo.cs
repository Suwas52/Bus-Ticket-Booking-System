

namespace BusBooking.Core.Repository.Interface
{
    public interface IGenericRepo<T, TKey> where T : class
    {
        Task<IEnumerable<T>> SelectAllAsync();

        Task<T> SelectByIdAsync(TKey id);

        Task<T> CreateAsync(T entity);

        Task<T> UpdateAsync(T entity);

        Task DeleteAsync(TKey id);
    }

}