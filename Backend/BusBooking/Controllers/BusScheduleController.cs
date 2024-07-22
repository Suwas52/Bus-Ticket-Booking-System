using AutoMapper;
using BusBooking.Core.Dto.General;
using BusBooking.Core.Dto;
using BusBooking.Core.Model;
using BusBooking.Core.Repository.Interface;
using BusBooking.Core.Repository.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BusBooking.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BusScheduleController : ControllerBase
    {
        private readonly IBusScheduleRepo _scheduleRepo;
        private readonly IMapper _mapper;
        private readonly ILogger<BusScheduleController> _logger;

        public BusScheduleController(IBusScheduleRepo scheduleRepo, IMapper mapper, ILogger<BusScheduleController> logger)
        {
            _scheduleRepo = scheduleRepo;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusScheduleReadDto>>> GetAllBuses()
        {
            try
            {
                var busSchedules = await _scheduleRepo.GetAllAsync();
                var schedulesData = _mapper.Map<IEnumerable<BusScheduleReadDto>>(busSchedules);
                return Ok(schedulesData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retreiving BusSchedules");
                return StatusCode(500, "An occur while processing request");
            }

        }

        [HttpPost]
        public async Task<ActionResult<GeneralResponseDto>> CreateBus([FromBody] BusScheduleCreateDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var newData = _mapper.Map<BusSchedule>(model);
                await _scheduleRepo.CreateAsync(newData).ConfigureAwait(false);
                _logger.LogInformation("BusSchedule created successfully: {BusId}", newData.BusId);
                return new GeneralResponseDto()
                {
                    IsSucceed = true,
                    StatusCode = 201,
                    Message = "BusSchedule Created Successfully",
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occur while Adding busSchedule");
                return StatusCode(StatusCodes.Status500InternalServerError, new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 500,
                    Message = "An error occurred while creating the busSchedule"
                });
            }

        }

        [HttpPut("{id}")]
        public async Task<ActionResult<GeneralResponseDto>> UpdateBus([FromBody] BusScheduleUpdateDto model, int id)
        {
            try
            {
                var busSchedule = await _scheduleRepo.GetByIdAsync(id).ConfigureAwait(false);
                if (busSchedule == null)
                {
                    return NotFound(new GeneralResponseDto()
                    {
                        IsSucceed = false,
                        StatusCode = 404,
                        Message = "BusSchedule not Found"
                    });
                }
                _mapper.Map(model, busSchedule);
                await _scheduleRepo.UpdateAsync(busSchedule);
                _logger.LogInformation("BusSchedule Update Successfully");

                return Ok(new GeneralResponseDto()
                {
                    IsSucceed = true,
                    StatusCode = 200,
                    Message = "BusSchedule Update Successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occur while updating BusSchedule");

                return StatusCode(500, new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 500,
                    Message = "An Error occor while updating BusSchedule"
                });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BusScheduleReadDto>> GetBusById(int id)
        {
            try
            {
                var schedule = await _scheduleRepo.GetByIdAsync(id).ConfigureAwait(false);
                if (schedule == null || schedule.IsDeleted == true)
                {
                    return NotFound(new GeneralResponseDto
                    {
                        IsSucceed = false,
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "BusSchedule Not Found"
                    });
                }

                var scheduleData = _mapper.Map<BusScheduleReadDto>(schedule);
                return Ok(scheduleData);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving for details BusSchedule");
                return StatusCode(500, "An error occurred while retrieving BusSchedule");
            }

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<GeneralResponseDto>> DeleteBus(int id)
        {
            try
            {
                var schedule = await _scheduleRepo.GetByIdAsync(id).ConfigureAwait(false);
                if (schedule == null || schedule.IsDeleted)
                {
                    return NotFound(new GeneralResponseDto()
                    {
                        IsSucceed = false,
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "BusSchedule not Found"
                    });
                }

                await _scheduleRepo.DeleteAsync(id).ConfigureAwait(false);
                return Ok(new GeneralResponseDto()
                {
                    IsSucceed = true,
                    StatusCode = 200,
                    Message = "BusSchedule Delete Successfully"
                });

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while delete BusSchedule");
                return StatusCode(500, new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Message = " Error occur while Deleting BusSchedule Data"
                });
            }
        }
    }
}
