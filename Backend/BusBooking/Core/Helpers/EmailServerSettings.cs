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
        public bool SMTPOverSSL { get; set; } = true;
        public int SMTPPort { get; set; }
        public string SMTPFrom { get; set; } = "";
        public string SMTPUser { get; set; } = "";
        public string SMTPPassword { get; set; } = "";
        public string OTPContent { get; set; } = "Your OTP Code is: {<a href='{link}'>here</a>}.";
        public string RegisterContent { get; set; } = "Welcome message. username: {username} / Password: {password}. Thank You";
    }
}
