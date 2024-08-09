
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

        /*public async Task CreateAsync(Bus model)
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
        }*/

        public async Task CreateAsync(Bus model)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var loginUser = _authHelper.GetCurrentUser();

                model.CreatedAt = DateTime.Now;
                model.CreatedBy = loginUser.UserName;
                model.IsDeleted = false;

                // Add bus first to generate the BusId
                await _context.Buses.AddAsync(model);
                await _context.SaveChangesAsync();

                // Initialize seats
                /*for (int i = 1; i <= model.Capacity; i++)
                {
                    var seat = new Seat
                    {
                        BusId = model.BusId,
                        SeatNumber = i,
                        Status = SeatStatus.Available
                    };
                    await _context.Seats.AddAsync(seat);
                }

                await _context.SaveChangesAsync();

                await transaction.CommitAsync();*/

                /*char[] s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();*/

                // Initialize seats

                /*int row = 10;
                int column = 4; 

                for(int i = 0;i < row; i++)
                {
                    for(int j = 1; j <= column; j++)
                    {
                        var seat = new Seat
                        {
                            BusId = model.BusId,
                            SeatNumber = i,
                            SeatName = $"{s[i]}{j}",
                            Status = SeatStatus.Available
                        };
                        await _context.Seats.AddAsync(seat);
                    }
                }*/



                int columns = 4;
                char[] rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray(); // Extend row naming up to Z

                for (int i = 0; i < model.Capacity; i++)
                {
                    int rowGroup = i / (columns * rows.Length); // Handle cases beyond "Z"
                    int rowIndex = (i / columns) % rows.Length;
                    int columnIndex = (i % columns) + 1;

                    string seatName;
                    if (rowGroup > 0)
                    {
                        seatName = rows[rowGroup - 1].ToString() + rows[rowIndex] + columnIndex.ToString(); // e.g., AA1, AB2, etc.
                    }
                    else
                    {
                        seatName = rows[rowIndex] + columnIndex.ToString(); // e.g., A1, B2, etc.
                    }

                    var seat = new Seat
                    {
                        BusId = model.BusId,
                        SeatNumber = i,
                        SeatName = seatName,
                        Status = SeatStatus.Available
                    };

                    await _context.Seats.AddAsync(seat);
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }
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