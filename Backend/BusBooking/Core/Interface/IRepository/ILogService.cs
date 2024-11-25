using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BusBooking.Core.Dto.Log;

namespace BusBooking.Core.Interface.IRepository
{
    public interface ILogService
    {
        Task SaveNewLog(string UserName, string Description);

        Task<IEnumerable<GetLogDto>> GetLogsAsync();

        Task<IEnumerable<GetLogDto>> GetMyLogsAsync(ClaimsPrincipal User);
    }
}