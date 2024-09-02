using BusBooking.Core.Repository.Interface;

namespace BusBooking.Core.Repository.Services
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        public FileService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task DeleteFile(string fileName)
        {
            var contentPath = _webHostEnvironment.ContentRootPath;
            var path = Path.Combine(contentPath, $"Uploads",fileName);
            if(File.Exists(path))
                File.Delete(path);  
        }

        public Tuple<int, string> SaveFile(IFormFile imageFile)
        {
            try
            {
                var maxFileSizeInMb = 10;
                var maxFileSizeInBytes = maxFileSizeInMb * 1024 * 1024;

                if (imageFile.Length > maxFileSizeInBytes)
                {
                    string msg = $"File size exceeds the maximum limit of {maxFileSizeInMb} MB.";
                    return new Tuple<int, string>(0, msg);
                }

                var wwwPath = _webHostEnvironment.ContentRootPath;

                var path = Path.Combine(wwwPath, "Uploads");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                var ext = Path.GetExtension(imageFile.FileName);

                var allowedExtensions = new string[] { ".jpg", ".png", ".jpeg", ".JPG", ".JPEG", ".PNG" };

                if (!allowedExtensions.Contains(ext))
                {
                    string msg = string.Format("Only {0} extensions are allowed", string.Join(",", allowedExtensions));

                    return new Tuple<int, string>(0, msg);
                }

                string uniqueString = Guid.NewGuid().ToString();

                var newFileName = uniqueString + ext;
                var fileWithPath = Path.Combine(path, newFileName);
                var stream = new FileStream(fileWithPath, FileMode.Create);
                imageFile.CopyTo(stream);
                stream.Close();
                return new Tuple<int, string>(1, newFileName);
            }
            catch(Exception ex) 
            {
                return new Tuple<int, string>(0, "Error has occured");
            }
        }
    }
}
