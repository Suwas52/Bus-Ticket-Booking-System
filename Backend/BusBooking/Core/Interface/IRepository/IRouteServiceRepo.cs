using BusBooking.Core.Dto;

namespace BusBooking.Core.Interface.IRepository
{
    public interface IRouteServiceRepo
    {
        Task<IEnumerable<AvailableBusDto>> GetAvailableBuses(string StartLocation, string EndLocation, DateTime DepartureTime);
    }
}
