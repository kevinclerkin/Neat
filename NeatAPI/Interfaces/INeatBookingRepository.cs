using NeatAPI.Models;

namespace NeatAPI.Interfaces
{
  public interface INeatBookingRepository
  {
    ICollection<NeatBooking> GetBookings();

    ICollection<NeatBooking> GetBookingsByClientEmail(string clientEmail);

    NeatBooking CreateBooking(NeatBooking neatBooking);

    IEnumerable<NeatBooking> DeleteBooking(int id);

    ICollection<NeatBooking> GetNextBooking();


  }
}
