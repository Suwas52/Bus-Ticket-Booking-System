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
            CreateMap<BusSchedule, BusScheduleReadDto>();
            CreateMap<BusScheduleCreateDto, BusSchedule>();
            CreateMap<BusScheduleUpdateDto, BusSchedule>();
            CreateMap<BusSchedule, BusScheduleUpdateDto>();

            //Booking
            CreateMap<Booking, BookingReadDto>();
            CreateMap<BookingCreateDto, Booking>();


        }
    }
}
