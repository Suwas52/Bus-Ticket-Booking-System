namespace BusBooking.Core.Repository.Interface
{
    public interface IFileService
    {
        public Tuple<int, string> SaveFile(IFormFile imageFile);

        public Task DeleteFile(string fileName);
    }
}
