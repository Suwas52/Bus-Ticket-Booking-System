using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BusBooking.Core.Context;
using BusBooking.Core.Dto.Log;
using BusBooking.Core.Interface.IRepository;
using BusBooking.Core.Model;

namespace BusBooking.Core.Repository
{
    public class LogService : ILogService
    {
        private readonly ApplicationDbContext context;

        public LogService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task SaveNewLog(string UserName, string Description)
        {
            var newLog = new Log()
            {
                UserName = UserName,
                Description = Description
            };
            await context.Logs.AddAsync(newLog);
            await context.SaveChangesAsync();
        }
        public Task<IEnumerable<GetLogDto>> GetMyLogsAsync(ClaimsPrincipal User)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<GetLogDto>> GetLogsAsync()
        {
            throw new NotImplementedException();
        }
    }
}