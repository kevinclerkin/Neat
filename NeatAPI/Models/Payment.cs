using System.ComponentModel.DataAnnotations.Schema;

namespace NeatAPI.Models
{
    public class Payment
    {
        public int PaymentId { get; set; }

        public Boolean IsConfirmed { get; set; }

        [ForeignKey("NeatBooking")]
        public int BookingId { get; set; }
    }
}
