using NeatAPI.Data;
using NeatAPI.Models;

namespace NeatAPI.Repositories
{
  public class NeatBookingRepository
  {
    private readonly DataContext _context;
    public NeatBookingRepository(DataContext context) {

      _context = context;

    }

    public ICollection<NeatBooking> GetBookings()
    {
      return _context.NeatBookings.OrderBy(i => i.Id).ToList();
    }
  }
}
