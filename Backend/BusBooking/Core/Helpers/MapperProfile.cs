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
                .ForMember(dest => dest.BusId, opt => opt.MapFrom(src => src.Bus.BusId))
                .ForMember(dest => dest.StartLocation, opt => opt.MapFrom(src => src.Routes.StartLocation))
                .ForMember(dest => dest.EndLocation, opt => opt.MapFrom(src => src.Routes.EndLocation))
                .ForMember(dest => dest.RouteId, opt => opt.MapFrom(src => src.Routes.RouteId));

            CreateMap<BusScheduleCreateDto, BusSchedule>();
            CreateMap<BusScheduleUpdateDto, BusSchedule>();
            CreateMap<BusSchedule, BusScheduleUpdateDto>();

            //Booking
            CreateMap<Booking, BookingReadDto>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.UserName))
                .ForMember(dest => dest.DepartureTime, opt => opt.MapFrom(src => src.BusSchedule.DepartureTime))
                .ForMember(dest => dest.ArrivalTime, opt => opt.MapFrom(src => src.BusSchedule.ArrivalTime))
                .ForMember(dest => dest.SeatName, opt => opt.MapFrom(src => src.Seat.SeatName))
                .ForMember(dest => dest.SeatNumber, opt => opt.MapFrom(src => src.Seat.SeatNumber));
            CreateMap<BookingCreateDto, Booking>();

            //Price
            CreateMap<Price, PriceReadDto>()
                .ForMember(des => des.StartLocation, opt => opt.MapFrom(src => src.Route.StartLocation))
                .ForMember(des => des.EndLocation, opt => opt.MapFrom(src => src.Route.EndLocation));
            CreateMap<PriceCreateDto, Price>();
            CreateMap<PriceUpdateDto, Price>();
            CreateMap<Price, PriceUpdateDto>();    


        }
    }
}
