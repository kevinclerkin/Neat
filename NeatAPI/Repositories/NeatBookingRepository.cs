using NeatAPI.Data;
using NeatAPI.Interfaces;
using NeatAPI.Models;

namespace NeatAPI.Repositories
{
  public class NeatBookingRepository : INeatBookingRepository
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