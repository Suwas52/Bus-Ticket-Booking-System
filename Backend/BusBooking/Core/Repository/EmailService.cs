using BusBooking.Core.Interface.IRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using System.Net.Mail;

namespace BusBooking.Core.Repository
{
    public class EmailService : IEmailService
    {
        private readonly SmtpClient _smtpClient;
        private readonly IConfiguration _configuration;
        private readonly IUrlHelper _urlHelper;
        public EmailService(SmtpClient smtpClient, IConfiguration configuration, IUrlHelper urlHelper)
        {
            _smtpClient = smtpClient;
            _configuration = configuration;
            _urlHelper = urlHelper;
        }
        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var mail = new MailMessage
            {
                From = new MailAddress(_configuration["EmailSettings:senderEmail"]),
                Subject = subject,
                Body = message,
                IsBodyHtml = true,
            };
            mail.To.Add(email);

            await _smtpClient.SendMailAsync(mail);
        }
    }
}
