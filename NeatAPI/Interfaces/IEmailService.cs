using SendGrid;

namespace NeatAPI.Interfaces
{
    public interface IEmailService
    {
        Task SendBookingConfirmationEmail(string toEmail, string subject, string body);
        
        

    }
}
