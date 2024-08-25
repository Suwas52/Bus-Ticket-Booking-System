using BusBooking.Core.Context;
using BusBooking.Core.Dto;
using BusBooking.Core.Dto.General;
using BusBooking.Core.Helpers;
using BusBooking.Core.Model;
using BusBooking.Core.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using static BusBooking.Core.Model.Seat;

namespace BusBooking.Core.Repository.Services
{
    public class BookingRepo : IBookingRepo
    {
        private readonly ApplicationDbContext _context;
        private readonly IAuthHelper _authHelper;

        public BookingRepo(ApplicationDbContext context, IAuthHelper authHelper)
        {
            _context = context;
            _authHelper = authHelper;
        }

        public async Task<GeneralResponseDto> CreateAsync(Booking model)
        {
            var seat = await _context.Seats.FindAsync(model.SeatId);

            if(seat == null  )
            {
                return new GeneralResponseDto
                {
                    IsSucceed = false,
                    StatusCode = 400,
                    Message = "Seat does not exist."
                };
            }

            if (seat.Status == SeatStatus.Unavailable)
            {
                return new GeneralResponseDto
                {
                    IsSucceed = false,
                    StatusCode = 400,
                    Message = "Seat is unaviable"
                };
            }
             if (seat.Status == SeatStatus.Booked)
            {
                return new GeneralResponseDto
                {
                    IsSucceed = false,
                    StatusCode = 400,
                    Message = "Seat is already booked"
                };
            }



            var loginUser = await _authHelper.GetCurrentUserAsync();
            model.UserId = loginUser.Id;
            model.BookedBy = loginUser.UserName;
            model.BookingDate = DateTime.Now;
            model.IsDeleted = false;
            model.Status = BookingStatus.Pending;

            await _context.Bookings.AddAsync(model);

            // Update seat status to unavailable
            seat.Status = SeatStatus.Unavailable;
            _context.Seats.Update(seat);

            await _context.SaveChangesAsync();

            return new GeneralResponseDto
            {
                IsSucceed = true,
                StatusCode = 201,
                Message = "Booking created successfully."
            };
        }

        public async Task<IEnumerable<Booking>> GetAllAsync(string? userId = null)
        {
            var query = _context.Bookings
                .Where(x => !x.IsDeleted)
                .Include(b => b.User)
                .Include(b => b.BusSchedule)
                .Include(b => b.Seat)
                /*.Include(b => b.BusSchedule.Routes)
                .Include(b => b.BusSchedule.Bus)
                .Include(b => b.BusSchedule.Routes.Prices)*/
                .AsQueryable();

            if (!string.IsNullOrEmpty(userId))
            {
                query = query.Where(b => b.UserId == userId);
            }

            return await query.ToListAsync();

        }


        public async Task<GeneralResponseDto> ApproveAsync(int id)
        {
            var loginUser = await _authHelper.GetCurrentUserAsync();
            var booking = await _context.Bookings.FindAsync(id);
            if(booking == null || booking.IsDeleted) 
            {
                return new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 404,
                    Message = "Booking not found",
                };
            }

            booking.Status = BookingStatus.Approved;
            booking.ApprovedDate = DateTime.Now;
            booking.UpdatedDate = DateTime.Now;
            booking.UpdatedBy = loginUser.UserName;

            //make seat status booked
            var seat = await _context.Seats.FindAsync(booking.SeatId);

            if (seat != null)
            {
                seat.Status = SeatStatus.Booked;
                _context.Seats.Update(seat);
            }

            _context.Entry(booking).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return new GeneralResponseDto()
            {
                IsSucceed = true,
                StatusCode = 200,
                Message = "Booking approved Successfully",
            };
        }

        public async Task<GeneralResponseDto> RejectAsync(int id)
        {
            var loginUser = await _authHelper.GetCurrentUserAsync();
            var booking = await _context.Bookings.FindAsync(id);
            if(booking == null && booking.IsDeleted)
            {
                return new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 404,
                    Message = " Booking is not found"
                };
            }

            booking.Status = BookingStatus.Rejected;
            booking.RejectedDate = DateTime.Now;
            booking.UpdatedDate = DateTime.Now;
            booking.UpdatedBy = loginUser.UserName;

            // make seat available again
            var seat = await _context.Seats.FindAsync(booking.SeatId);

            if(seat != null)
            {
                seat.Status = SeatStatus.Available;
                _context.Seats.Update(seat);
            }

            _context.Entry(booking).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return new GeneralResponseDto
            {
                IsSucceed = true,
                StatusCode = 200,
                Message = "Booking rejected successfully."
            };

        }

        public async Task UpdateAsync(Booking model)
        {
            var loginUser = await _authHelper.GetCurrentUserAsync();
            if (model.IsDeleted == false)
            {
                model.UpdatedDate = DateTime.Now;
                model.UpdatedBy = loginUser.UserName;
                _context.Entry(model).State = EntityState.Modified;
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
        }

        public async Task<Booking> GetByIdAsync(int id)
        {
            return await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.BusSchedule)
                .Include(b => b.Seat)
                .Include(b => b.BusSchedule.Routes)
                .Include(b => b.BusSchedule.Bus)
                .Include(b => b.BusSchedule.Routes.Prices).FirstOrDefaultAsync(bs => bs.BookingId == id && bs.IsDeleted == false).ConfigureAwait(false);
        }

        public async Task DeleteAsync(int id)
        {
            var loginUser = await _authHelper.GetCurrentUserAsync();
            var booking = await _context.Bookings.FindAsync(id).ConfigureAwait(false);
            if (booking != null)
            {
                booking.IsDeleted = true;
                booking.UpdatedBy = loginUser.UserName;
                booking.UpdatedDate = DateTime.Now;

                _context.Entry(booking).State = EntityState.Modified;
                await _context.SaveChangesAsync().ConfigureAwait(false);
            }
        }

        public async Task<int> GetTotalBookingsCountAsync()
        {
            return await _context.Bookings.Where(b => b.IsDeleted == false).CountAsync();
        }

        public async Task<int> GetTotalBookingsCountAsync(string userId)
        {
            return await _context.Bookings
                .Where(b => b.UserId == userId && !b.IsDeleted)
                .CountAsync();
        }

        public async Task<int> GetAcceptedBookingsCountAsync(string userId)
        {
            return await _context.Bookings
                .Where(b => b.UserId == userId && b.Status == BookingStatus.Approved && !b.IsDeleted)
                .CountAsync();
        }

        public async Task<int> GetRejectedBookingsCountAsync(string userId)
        {
            return await _context.Bookings
                .Where(b => b.UserId == userId && b.Status == BookingStatus.Rejected && !b.IsDeleted)
                .CountAsync();
        }
    }
}
