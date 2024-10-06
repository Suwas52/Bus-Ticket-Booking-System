using System.Net.Mail;
using System.Net.Mime;
using System.Net;

namespace BusBooking.Core.Helpers
{
    public static class EmailHelper
    {
        public static EmailServerSettings _Config { get; set; } = new EmailServerSettings();
        public static ApplicationEmailTemplates _AppEmailTemplates { get; set; } = new ApplicationEmailTemplates();
        public static void SendEmail(string recipientEmail, string subject, string body, string attachmentPath = "", bool SendEvenIfNotificationDisabled = false)
        {
            //HasEmailNotification: false //SendEvenIfNotificationDisabled: false
            if (!_Config.HasEmailNotification && !SendEvenIfNotificationDisabled)
            {
                return;
            }
            // Create a new MailMessage
            MailMessage mail = new MailMessage(_Config.SMTPFrom, recipientEmail)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true, // Change to true if you want to send HTML content
            };

            // Add an attachment (optional)
            if (!string.IsNullOrEmpty(attachmentPath))
            {

                if (File.Exists(attachmentPath))
                {
                    Attachment attachment = new Attachment(attachmentPath, MediaTypeNames.Application.Octet);
                    mail.Attachments.Add(attachment);
                }
            }

            // Create and configure the SMTP client
            SmtpClient smtpClient = new SmtpClient(_Config.SMTPServer)
            {
                Port = _Config.SMTPPort,
                Credentials = new NetworkCredential(_Config.SMTPUser, _Config.SMTPPassword),
                EnableSsl = _Config.SMTPOverSSL, // Enable SSL if your SMTP server requires it
            };

            try
            {
                // Send the email
                smtpClient.Send(mail);

            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                // Clean up resources
                mail.Dispose();
                smtpClient.Dispose();
            }
        }
    }
}
