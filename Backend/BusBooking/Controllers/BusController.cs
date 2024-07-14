using AutoMapper;
using BusBooking.Core.Dto;
using BusBooking.Core.Dto.General;
using BusBooking.Core.Model;
using BusBooking.Core.Repository.Interface;

using Microsoft.AspNetCore.Mvc;

namespace BusBooking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusController : ControllerBase
    {
        private readonly IBusRepo _busRepo;
        private readonly IMapper _mapper;
        private readonly ILogger<BusController> _logger;

        public BusController(IBusRepo busRepo, IMapper mapper, ILogger<BusController> logger)
        {
            _busRepo = busRepo;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult<GeneralResponseDto>> CreateBus([FromBody] BusCreateDto model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var newData = _mapper.Map<Bus>(model);
                await _busRepo.CreateAsync(newData).ConfigureAwait(false);
                _logger.LogInformation("Bus created successfully: {BusId}", newData.BusId);

                /*return CreatedAtAction(nameof())*/
                return new GeneralResponseDto()
                {
                    IsSucceed = true,
                    StatusCode = 201,
                    Message = "Bus Created Successfully",
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,"Error occur while Adding Bus");
                return StatusCode(StatusCodes.Status500InternalServerError, new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode= 500,
                    Message = "An error occurred while creating the bus"
                });
            }

        } 
    }
}
