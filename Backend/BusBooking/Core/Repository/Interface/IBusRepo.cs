using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusBooking.Core.Dto.General;
using BusBooking.Core.Model;

namespace BusBooking.Core.Repository.Interface
{
    public interface IBusRepo
    {
        Task<IEnumerable<Bus>> GetAllAsync();
        Task CreateAsync(Bus model);

        Task UpdateAsync(Bus model);

        Task<Bus> GetByIdAsync(int id);

        Task DeleteAsync(int id);
    }
}