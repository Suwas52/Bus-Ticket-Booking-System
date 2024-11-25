using AutoMapper;
using BusBooking.Constants;
using BusBooking.Core.Dto;
using BusBooking.Core.Dto.General;
using BusBooking.Core.Helpers;
using BusBooking.Core.Interface.IRepository;
using BusBooking.Core.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BusBooking.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepo _bookingRepo;
        private readonly IMapper _mapper;
        private readonly ILogger<BookingController> _logger;
        private readonly IAuthHelper _authHelper;

        public BookingController(IBookingRepo bookingRepo, IMapper mapper, ILogger<BookingController> logger, IAuthHelper authHelper)
        {
            _bookingRepo = bookingRepo;
            _mapper = mapper;
            _logger = logger;
            _authHelper = authHelper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingReadDto>>> GetAllBooking()
        {
            try
            {
                var loginUser = await _authHelper.GetCurrentUserAsync();
                var roles = loginUser.Roles;

                IEnumerable<Booking> bookings;

                // If the user is not an admin, superadmin, or staff, only return their bookings
                if (roles.Contains(StaticRoleUser.SUPERADMIN) ||
                    roles.Contains(StaticRoleUser.ADMIN) ||
                    roles.Contains(StaticRoleUser.STAFF))
                {
                    bookings = await _bookingRepo.GetAllAsync();
                }
                else
                {
                    bookings = await _bookingRepo.GetAllAsync(loginUser.Id);
                }

                var mapData = _mapper.Map<IEnumerable<BookingReadDto>>(bookings);
                return Ok(mapData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while requesting booking data");
                return StatusCode(500, "Error occurred while processing the booking data request.");
            }

        }

        [HttpPost]
        [Authorize(Roles = StaticRoleUser.USER)]
        public async Task<ActionResult<GeneralResponseDto>> CreateBooking([FromBody] BookingCreateDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var bookingData = _mapper.Map<Booking>(model);
                var response = await _bookingRepo.CreateAsync(bookingData);
                if (!response.IsSucceed)
                {
                    return BadRequest(response);
                }
                return Ok(response);

            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating booking");
                return StatusCode(500, "An error occurred while creating the booking.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookingReadDto>> GetBookingById(int id)
        {
            try
            {
                var booking = await _bookingRepo.GetByIdAsync(id).ConfigureAwait(false);
                if (booking == null || booking.IsDeleted)
                {
                    return NotFound(new GeneralResponseDto
                    {
                        IsSucceed = false,
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Booking Not Found"
                    });
                }

                var mapData = _mapper.Map<BookingReadDto>(booking);
                return Ok(mapData);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving for details Booking");
                return StatusCode(500, "An error occurred while retrieving Booking");
            }

        }

        [HttpPut("{id}")]
        public async Task<ActionResult<GeneralResponseDto>> UpdateBooking([FromBody] BookingUpdateDto model, int id)
        {
            try
            {
                var booking = await _bookingRepo.GetByIdAsync(id).ConfigureAwait(false);
                if (booking == null || booking.IsDeleted)
                {
                    return NotFound(new GeneralResponseDto()
                    {
                        IsSucceed = false,
                        StatusCode = 404,
                        Message = "Bus not Found"
                    });
                }
                _mapper.Map(model, booking);
                await _bookingRepo.UpdateAsync(booking);
                _logger.LogInformation("Booking Update Successfully");

                return Ok(new GeneralResponseDto()
                {
                    IsSucceed = true,
                    StatusCode = 200,
                    Message = "Booking Update Successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occur while updating Booking");

                return StatusCode(500, new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 500,
                    Message = "An Error occor while updating Booking"
                });
            }
        }


        [HttpPut("approve/{id}")]
        [Authorize(Roles = StaticRoleUser.SuperAdminAdminAndStaff)]
        public async Task<ActionResult<GeneralResponseDto>> ApproveBooking(int id)
        {
            var response = await _bookingRepo.ApproveAsync(id);
            if (!response.IsSucceed)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPut("reject/{id}")]
        [Authorize(Roles = StaticRoleUser.SuperAdminAdminAndStaff)]
        public async Task<ActionResult<GeneralResponseDto>> RejectBooking(int id)
        {
            var response = await _bookingRepo.RejectAsync(id);
            if (!response.IsSucceed)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }



        [HttpDelete("{id}")]
        public async Task<ActionResult<GeneralResponseDto>> DeleteBus(int id)
        {
            try
            {
                var booking = await _bookingRepo.GetByIdAsync(id).ConfigureAwait(false);
                if (booking == null || booking.IsDeleted)
                {
                    return NotFound(new GeneralResponseDto()
                    {
                        IsSucceed = false,
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Booking not Found"
                    });
                }

                await _bookingRepo.DeleteAsync(id).ConfigureAwait(false);
                return Ok(new GeneralResponseDto()
                {
                    IsSucceed = true,
                    StatusCode = 200,
                    Message = "Booking Delete Successfully"
                });

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while delete Booking");
                return StatusCode(500, new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Message = " Error occur while Deleting Booking Data"
                });
            }
        }

        [HttpGet("count")]
        [Authorize(Roles = StaticRoleUser.USER)]
        public async Task<ActionResult<BookingCountDto>> GetBookingCounts()
        {
            var loginUser = await _authHelper.GetCurrentUserAsync();
            try
            {
                var totalBookingCount = await _bookingRepo.GetTotalBookingsCountAsync(loginUser.Id);
                var acceptedCount = await _bookingRepo.GetAcceptedBookingsCountAsync(loginUser.Id);
                var rejectedCount = await _bookingRepo.GetRejectedBookingsCountAsync(loginUser.Id);

                var result = new BookingCountDto
                {
                    TotalBookingCount = totalBookingCount,
                    AcceptedCount = acceptedCount,
                    RejectedCount = rejectedCount
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting booking counts");
                return StatusCode(500, "An error occurred while getting booking counts.");
            }
        }


    }
}
