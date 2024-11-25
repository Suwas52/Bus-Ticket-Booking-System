using AutoMapper;
using BusBooking.Constants;
using BusBooking.Core.Dto.General;
using BusBooking.Core.Dto;
using BusBooking.Core.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BusBooking.Core.Interface.IRepository;

namespace BusBooking.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PriceController : ControllerBase
    {
        private readonly IPriceRepo _priceRepo;
        private readonly IMapper _mapper;
        private readonly ILogger<PriceController> _logger;
        public PriceController(IPriceRepo priceRepo, IMapper mapper, ILogger<PriceController> logger)
        {
            _priceRepo = priceRepo;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        [Authorize(Roles = StaticRoleUser.SuperAdminAndAdmin)]
        public async Task<ActionResult<IEnumerable<PriceReadDto>>> GetAllBusRoutePrice()
        {
            try
            {
                var price = await _priceRepo.GetAllAsync();
                var priceData = _mapper.Map<IEnumerable<PriceReadDto>>(price);
                return Ok(priceData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retreiving Price");
                return StatusCode(500, "An occur while processing request");
            }

        }

        [HttpPost]
        [Authorize(Roles = StaticRoleUser.SuperAdminAndAdmin)]
        public async Task<ActionResult<GeneralResponseDto>> CreateBusRoutePrice([FromBody] PriceCreateDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var newData = _mapper.Map<Price>(model);
                await _priceRepo.CreateAsync(newData).ConfigureAwait(false);
                _logger.LogInformation("Route Price created successfully: {BusId}", newData.PriceId);
                return new GeneralResponseDto()
                {
                    IsSucceed = true,
                    StatusCode = 201,
                    Message = "Route Price Created Successfully",
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occur while Adding Price");
                return StatusCode(StatusCodes.Status500InternalServerError, new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 500,
                    Message = "An error occurred while creating the price"
                });
            }

        }

        [HttpPut("{id}")]
        [Authorize(Roles = StaticRoleUser.SuperAdminAndAdmin)]
        public async Task<ActionResult<GeneralResponseDto>> UpdateBusRoutePrice([FromBody] PriceUpdateDto model, int id)
        {
            try
            {
                var price = await _priceRepo.GetByIdAsync(id).ConfigureAwait(false);
                if (price == null)
                {
                    return NotFound(new GeneralResponseDto()
                    {
                        IsSucceed = false,
                        StatusCode = 404,
                        Message = "Bus Route Price not Found"
                    });
                }
                _mapper.Map(model, price);
                await _priceRepo.UpdateAsync(price);
                _logger.LogInformation("Bus Route Price Update Successfully");

                return Ok(new GeneralResponseDto()
                {
                    IsSucceed = true,
                    StatusCode = 200,
                    Message = "Bus Route Price Update Successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occur while updating Price");

                return StatusCode(500, new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 500,
                    Message = "An Error occor while updating Price"
                });
            }
        }

        [HttpGet("{id}")]
        [Authorize(Roles = StaticRoleUser.SuperAdminAndAdmin)]
        public async Task<ActionResult<PriceReadDto>> GetBusById(int id)
        {
            try
            {
                var price = await _priceRepo.GetByIdAsync(id).ConfigureAwait(false);
                if (price == null || price.IsDeleted == true)
                {
                    return NotFound(new GeneralResponseDto
                    {
                        IsSucceed = false,
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Bus Price is Not Found"
                    });
                }

                var priceData = _mapper.Map<PriceReadDto>(price);
                return Ok(priceData);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving for details Price");
                return StatusCode(500, "An error occurred while retrieving Price");
            }

        }

        [HttpDelete("{id}")]
        [Authorize(Roles = StaticRoleUser.SuperAdminAndAdmin)]
        public async Task<ActionResult<GeneralResponseDto>> DeleteBus(int id)
        {
            try
            {
                var price = await _priceRepo.GetByIdAsync(id).ConfigureAwait(false);
                if (price == null || price.IsDeleted)
                {
                    return NotFound(new GeneralResponseDto()
                    {
                        IsSucceed = false,
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Bus Price is not Found"
                    });
                }

                await _priceRepo.DeleteAsync(id).ConfigureAwait(false);
                return Ok(new GeneralResponseDto()
                {
                    IsSucceed = true,
                    StatusCode = 200,
                    Message = "Bus Route Price Delete Successfully"
                });

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while delete Bus Route Price");
                return StatusCode(500, new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Message = " Error occur while Deleting Bus Route Price Data"
                });
            }
        }

    }
}
