using BusBooking.Core.Context;
using BusBooking.Core.Dto;
using BusBooking.Core.Interface.IRepository;
using Microsoft.EntityFrameworkCore;

namespace BusBooking.Core.Repository
{
    public class SeatRepo : ISeatRepo
    {
        private readonly ApplicationDbContext _context;
        public SeatRepo(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<SeatReadDto>> GetSeat(int busId)
        {
            var busExists = await _context.Buses.AnyAsync(b => b.BusId == busId);
            if (!busExists)
            {
                // Handle the case where the busId doesn't exist
                // You could throw an exception or return an empty list
                return Enumerable.Empty<SeatReadDto>();
            }

            // Query the seats for the given busId
            var seats = await _context.Seats
                                      .Where(s => s.BusId == busId)
                                      .Select(s => new SeatReadDto
                                      {
                                          SeatId = s.SeatId,
                                          BusId = s.BusId,
                                          BusName = s.Bus.BusName, // Assuming Bus is a navigation property in Seat
                                          SeatNumber = s.SeatNumber,
                                          SeatName = s.SeatName,
                                          Status = s.Status
                                      })
                                      .ToListAsync();

            return seats;
        }
    }
}
