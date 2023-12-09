using Microsoft.Extensions.Options;
using NeatAPI.Interfaces;
using NeatAPI.Utils;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Text.RegularExpressions;

namespace NeatAPI.Services
{
    public class EmailService : IEmailService
    {
        
        private readonly IConfiguration _configuration;
        private readonly IOptions<EmailSettings> _options;

        public EmailService(IConfiguration configuration, IOptions<EmailSettings> options)
        {
            
            _configuration = configuration;
            _options = options;
        }

        public async Task SendBookingConfirmationEmail(string toEmail, string subject, string body)
        {
            string fromEmail = _options.Value.SenderEmail;
            string fromName = _options.Value.SenderName;
            string apiKey = _options.Value.ApiKey;
            var sendGridClient = new SendGridClient(apiKey);
            var from = new EmailAddress(fromEmail, fromName);
            var to = new EmailAddress(toEmail);
            var plainTextContent = Regex.Replace(body, "<[^>]*>", "");
            var msg = MailHelper.CreateSingleEmail(from, to, subject,
            plainTextContent, body);
            var response = await sendGridClient.SendEmailAsync(msg);
        }
    }
}
