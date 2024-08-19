using AutoMapper;
using BusBooking.Core.Dto;
using BusBooking.Core.Model;

namespace BusBooking.Core.Helpers
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            //Bus
            CreateMap<Bus, BusReadDto>();
            CreateMap<BusCreateDto, Bus>();
            CreateMap<BusUpdateDto, Bus>();
            CreateMap<Bus, BusUpdateDto>();

            //Route
            CreateMap<Routes, RouteReadDto>();
            CreateMap<RouteCreateDto, Routes>();
            CreateMap<RouteUpdateDto, Routes>();
            CreateMap<Routes, RouteUpdateDto>();

            //BusSchedule
            CreateMap<BusSchedule, BusScheduleReadDto>()
                .ForMember(dest => dest.BusName, opt => opt.MapFrom(src => src.Bus.BusName))
                .ForMember(dest => dest.StartLocation, opt => opt.MapFrom(src => src.Routes.StartLocation))
                .ForMember(dest => dest.EndLocation, opt => opt.MapFrom(src => src.Routes.EndLocation));

            CreateMap<BusScheduleCreateDto, BusSchedule>();
            CreateMap<BusScheduleUpdateDto, BusSchedule>();
            CreateMap<BusSchedule, BusScheduleUpdateDto>();

            //Booking
            CreateMap<Booking, BookingReadDto>();
            CreateMap<BookingCreateDto, Booking>();


        }
    }
}
