using NeatAPI.Models;

namespace NeatAPI.Interfaces
{
  public interface INeatBookingRepository
  {
    ICollection<NeatBooking> GetBookings();

    ICollection<NeatBooking> GetBookingsByClientEmail(string clientEmail);
  }
}
