using BusBooking.Core.Dto;

namespace BusBooking.Core.Repository.Interface
{
    public interface IRouteServiceRepo
    {
        Task<IEnumerable<AvailableBusDto>> GetAvailableBuses(string StartLocation, string EndLocation, DateTime DepartureTime);
    }
}
