using AutoMapper;
using BusBooking.Constants;
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
    public class RoutesController : ControllerBase
    {
        private readonly IRouteRepo _routeRepo;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;
        public RoutesController(IRouteRepo routeRepo, IMapper mapper, ILogger<RoutesController> logger)
        {
            _routeRepo = routeRepo;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        [Authorize(Roles = StaticRoleUser.SuperAdminAndAdmin)]
        public async Task<ActionResult<IEnumerable<RouteReadDto>>> GetAllRoutes()
        {
            try
            {
                var routes = await _routeRepo.GetAllAsync();
                _mapper.Map<IEnumerable<RouteReadDto>>(routes);
                return Ok(routes);

            }catch(Exception ex)
            {
                _logger.LogError(ex, "Error Occur while listing routes");
                return StatusCode(500, "An Error occur while processing request");
            }

        }

        [HttpPost]
        [Authorize(Roles = StaticRoleUser.SuperAdminAndAdmin)]
        public async Task<ActionResult<GeneralResponseDto>> CreateRoute([FromBody] RouteCreateDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var routeData = _mapper.Map<Routes>(model);
                await _routeRepo.CreateAsync(routeData).ConfigureAwait(false);
                _logger.LogInformation("Route is created Successfully");

                return Ok(new GeneralResponseDto()
                {
                    IsSucceed = true,
                    StatusCode = StatusCodes.Status201Created,
                    Message = " Route Created Successfully"
                });

            }catch(Exception ex)
            {
                _logger.LogError(ex, "Error occur while creating Route");
                return StatusCode(500, new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Message = "An error occurred while creating the Route"
                });
            }
        }

        [HttpGet("{id}")]
        [Authorize(Roles = StaticRoleUser.SuperAdminAndAdmin)]
        public async Task<ActionResult<RouteReadDto>> GetRouteById(int id)
        {
            try
            {
                var route = await _routeRepo.GetByIdAsync(id).ConfigureAwait(false);
                if (route == null || route.IsDeleted == true)
                {
                    return NotFound(new GeneralResponseDto
                    {
                        IsSucceed = false,
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Bus Not Found"
                    });
                }
                var routeData = _mapper.Map<RouteReadDto>(route);
                return Ok(routeData);
            }catch(Exception ex)
            {
                _logger.LogError(ex, "Error retrieving for detail Route");
                return StatusCode(500, "An error occurred while retrieving Route");
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = StaticRoleUser.SuperAdminAndAdmin)]
        public async Task<ActionResult<GeneralResponseDto>> UpdateRoute([FromBody] RouteUpdateDto model, int id)
        {
            try
            {
                var route = await _routeRepo.GetByIdAsync(id).ConfigureAwait(false);
                if(route == null)
                {
                    return NotFound(new GeneralResponseDto()
                    {
                        IsSucceed = false,
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Route not Found"
                    });
                }

                _mapper.Map(model, route);
                await _routeRepo.UpdateAsync(route);
                return new GeneralResponseDto()
                {
                    IsSucceed = true,
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Route Update Successfully"
                };

            }catch(Exception ex)
            {
                _logger.LogError(ex, "Error occur while updating Route");

                return StatusCode(500, new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = 500,
                    Message = "An Error occor while updating Route"
                });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = StaticRoleUser.SuperAdminAndAdmin)]
        public async Task<ActionResult<GeneralResponseDto>> DeleteRoute(int id)
        {
            try
            {
                var route = await _routeRepo.GetByIdAsync(id).ConfigureAwait(false);
                if (route == null || route.IsDeleted)
                {
                    return NotFound(new GeneralResponseDto()
                    {
                        IsSucceed = false,
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Route not Found"
                    });
                }
                await _routeRepo.DeleteAsync(id).ConfigureAwait(false);
                return new GeneralResponseDto()
                {
                    IsSucceed = true,
                    StatusCode = 200,
                    Message = "Route Delete Successfully"
                };
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error while delete Route");
                return StatusCode(500, new GeneralResponseDto()
                {
                    IsSucceed = false,
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Message = " Error occur while Deleting Route Data"
                });
            }
           


        }
    }
}
