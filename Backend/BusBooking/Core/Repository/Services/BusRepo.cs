
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
                var loginUser = await _authHelper.GetCurrentUserAsync();

                model.CreatedAt = DateTime.Now;
                model.CreatedBy = loginUser.UserName;
                model.IsDeleted = false;

               
                await _context.Buses.AddAsync(model);
                await _context.SaveChangesAsync();


                int columns = 4;
                char[] rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray(); // Extend row naming up to Z

                for (int i = 1; i <= model.Capacity; i++)
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

        public async Task<int> GetTotalBusCount()
        {
            return await _context.Buses.Where(b => b.IsDeleted == false).CountAsync();
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
            var loginUser = await _authHelper.GetCurrentUserAsync();

            var existingBus = await _context.Buses.FindAsync(model.BusId).ConfigureAwait(false);
            if (existingBus == null)
            {
                throw new KeyNotFoundException($"Bus with ID {model.BusId} not found.");
            }

            // Update properties
            existingBus.UpdatedAt = DateTime.Now;
            existingBus.UpdatedBy = loginUser.UserName;

            // Copy over only the updatable properties from the model to the existing bus
            existingBus.BusName = model.BusName;
            existingBus.BusNumber = model.BusNumber;
            existingBus.Capacity = model.Capacity;
            existingBus.BusType = model.BusType;
            // Note: Ensure you do not modify the BusId or other key properties

            // Optionally handle related seat data if necessary
            // This depends on your specific requirements for seat management during updates.
            // For example:
            // if (model.Capacity != existingBus.Capacity)
            // {
            //     // Update seat data (e.g., remove old seats, add new ones)
            // }

            _context.Entry(existingBus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                // Handle concurrency issues if needed
                throw new Exception("A concurrency error occurred while updating the bus.", ex);
            }
        }


        public async Task DeleteAsync(int id)
        {
            var loginUser = await _authHelper.GetCurrentUserAsync();
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