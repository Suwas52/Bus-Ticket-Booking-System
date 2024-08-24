using AutoMapper;
using BusBooking.Core.Dto;
using BusBooking.Core.Helpers;
using BusBooking.Core.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BusBooking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatController : ControllerBase
    {
        private readonly ISeatRepo _seatRepo;
        private readonly IMapper _mapper;
        private readonly ILogger<SeatController> _logger;
        private readonly IAuthHelper _authHelper;
        public SeatController(ISeatRepo seatRepo, IMapper mapper, ILogger<SeatController> logger)
        {
            _seatRepo = seatRepo;
            _mapper = mapper;
            _logger = logger;

        }

        [HttpGet("{busId}")]
        public async Task<ActionResult<IEnumerable<SeatReadDto>>> GetSeatsByBusId(int busId)
        {
            var seats = await _seatRepo.GetSeat(busId);

            if (seats == null || !seats.Any())
            {
                return NotFound($"No seats found for BusId: {busId}");
            }

            return Ok(seats);
        }
    }
}
