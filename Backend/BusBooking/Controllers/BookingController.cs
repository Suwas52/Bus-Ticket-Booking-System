using AutoMapper;
using BusBooking.Constants;
using BusBooking.Core.Dto;
using BusBooking.Core.Dto.General;
using BusBooking.Core.Model;
using BusBooking.Core.Repository.Interface;
using BusBooking.Core.Repository.Services;
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
        public BookingController(IBookingRepo bookingRepo, IMapper mapper, ILogger<BookingController> logger)
        {
            _bookingRepo = bookingRepo;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingReadDto>>> GetAllBooking()
        {
            try
            {
                var bookings = await _bookingRepo.GetAllAsync();
                var mapData = _mapper.Map<IEnumerable<BookingReadDto>>(bookings);
                return Ok(mapData);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error occur while requesting for booking data");
                return StatusCode(500, "Issued while Occuring request for booking data");
            }
            
        }

        [HttpPost]
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
        [Authorize(Roles = StaticRoleUser.OwnerAdmin)]
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
        [Authorize(Roles = StaticRoleUser.OwnerAdmin)]
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
    }
}
