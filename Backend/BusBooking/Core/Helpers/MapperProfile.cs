using AutoMapper;
using BusBooking.Core.Dto;
using BusBooking.Core.Model;

namespace BusBooking.Core.Helpers
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Bus, BusReadDto>();
            CreateMap<BusCreateDto, Bus>();
            CreateMap<BusUpdateDto, Bus>();
            CreateMap<Bus, BusUpdateDto>();
        }
    }
}
