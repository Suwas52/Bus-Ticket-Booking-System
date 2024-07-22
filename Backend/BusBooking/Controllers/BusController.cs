using AutoMapper;
using BusBooking.Core.Dto;
using BusBooking.Core.Dto.General;
using BusBooking.Core.Model;
using BusBooking.Core.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BusBooking.Controllers
{
    [Authorize]
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusReadDto>>> GetAllBuses()
        {
            try
            {
                var buses = await _busRepo.GetAllAsync();
                var busesData = _mapper.Map<IEnumerable<BusReadDto>>(buses);
                return Ok(busesData);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error retreiving buses");
                return StatusCode(500, "An occur while processing request");
            }
            
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

        [HttpPut("{id}")]
        public async Task<ActionResult<GeneralResponseDto>> UpdateBus([FromBody] BusUpdateDto model, int id)
        {
            try
            {
                var bus = await _busRepo.GetByIdAsync(id).ConfigureAwait(false);
                if(bus == null)
                {
                    return NotFound(new GeneralResponseDto()
                    {
                        IsSucceed=false,
                        StatusCode= 404,
                        Message = "Bus not Found"
                    });
                }
                _mapper.Map(model, bus);
                await _busRepo.UpdateAsync(bus);
                _logger.LogInformation("Bus Update Successfully");

                return Ok(new GeneralResponseDto()
                {
                    IsSucceed = true,
                    StatusCode = 200,
                    Message = "Bus Update Successfully"
                });
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error occur while updating Bus");

                return StatusCode(500, new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 500,
                    Message = "An Error occor while updating Bus"
                });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BusReadDto>> GetBusById(int id)
        {
            try
            {
                var bus = await _busRepo.GetByIdAsync(id).ConfigureAwait(false);
                if(bus == null || bus.IsDeleted == true)
                {
                    return NotFound(new GeneralResponseDto
                    {
                        IsSucceed = false,
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Bus Not Found"
                    });
                }

                var busData = _mapper.Map<BusReadDto>(bus);
                return Ok(busData);

            }catch(Exception ex)
            {
                _logger.LogError(ex, "Error retrieving for details bus");
                return StatusCode(500, "An error occurred while retrieving bus");
            }
            
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<GeneralResponseDto>> DeleteBus(int id)
        {
            try
            {
                var bus = await _busRepo.GetByIdAsync(id).ConfigureAwait(false);
                if(bus == null || bus.IsDeleted)
                {
                    return NotFound(new GeneralResponseDto()
                    {
                        IsSucceed = false,
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Bus not Found"
                    });
                }

                await _busRepo.DeleteAsync(id).ConfigureAwait(false);
                return Ok(new GeneralResponseDto()
                {
                    IsSucceed = true,
                    StatusCode = 200,
                    Message = "Bus Delete Successfully"
                });
                
            }catch(Exception ex)
            {
                _logger.LogError(ex, "Error while delete bus");
                return StatusCode(500, new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Message = " Error occur while Deleting Bus Data"
                });
            }
        }

    }
}
