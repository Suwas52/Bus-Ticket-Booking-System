﻿using BusBooking.Core.Context;
using BusBooking.Core.Dto;
using BusBooking.Core.Interface.IRepository;
using Microsoft.EntityFrameworkCore;

namespace BusBooking.Core.Repository
{
    public class RouteServiceRepo : IRouteServiceRepo
    {
        private readonly ApplicationDbContext _context;
        public RouteServiceRepo(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<AvailableBusDto>> GetAvailableBuses(string StartLocation, string EndLocation, DateTime DepartureTime)
        {
            var routes = await _context.Routes.Where(r => r.StartLocation == StartLocation && r.EndLocation == EndLocation && r.IsDeleted == false).ToListAsync();

            if (!routes.Any())
            {
                throw new Exception("No routes found for the selected location");
            }

            var schedules = await _context.BusSchedules.Where(s => routes.Select(r => r.RouteId).Contains(s.RouteId) && s.DepartureTime.DayOfYear == DepartureTime.DayOfYear && s.IsDeleted == false).Include(s => s.Bus).Include(s => s.Routes.Prices).ToListAsync();


            if (!schedules.Any())
            {
                throw new Exception("No Schedule found for the selected date.");
            }

            var availableBuses = schedules.Select(s => new AvailableBusDto
            {
                BusId = s.BusId,
                ScheduleId = s.ScheduleId,
                BusName = s.Bus.BusName,
                DepartureTime = s.DepartureTime,
                StartLocation = s.Routes.StartLocation,
                EndLocation = s.Routes.EndLocation,
                BusType = s.Bus.BusType,
                Distance = s.Routes.Distance,
                Price = s.Routes.Prices?.BasePrice ?? 0

            });

            return availableBuses;
        }
    }
}
