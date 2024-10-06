namespace BusBooking.Core.Helpers
{
    public class ApplicationEmailTemplates
    {
        public EmailTemplate Register { get; set; }
        public EmailTemplate AdminResetPwd { get; set; }
        public EmailTemplate ResetPwd { get; set; }
    }

    public class EmailTemplate 
    {
        public string subject { get; set; }
        public string body { get; set; }
    }

   public class EmailServerSettings
    {
        public string SMTPServer { get; set; } = "";
        public bool HasEmailNotification { get; set; } = false;
        public string SMTPUser { get; set; } = "";
        public string SMTPFrom { get; set; } = "";
        public string SMTPPassword { get; set; } = "";
        public  int SMTPPort { get; set; }
        public bool SMTPOverSSL { get; set; } = true;
    }
}
