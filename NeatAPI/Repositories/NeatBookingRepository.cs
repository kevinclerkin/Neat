using NeatAPI.Data;
using NeatAPI.Interfaces;
using NeatAPI.Models;


namespace NeatAPI.Repositories
{
    public class NeatBookingRepository : INeatBookingRepository
    {
        private readonly DataContext _context;
        public NeatBookingRepository(DataContext context)
        {

            _context = context;

        }

        public ICollection<NeatBooking> GetBookings()
        {
            return _context.NeatBookings.OrderBy(i => i.BookingId).ToList();
        }

        public ICollection<NeatBooking> GetBookingsByClientEmail(string clientEmail)
        {
            return _context.NeatBookings.Where(e => e.ClientEmail == clientEmail).ToList();
        }

        public NeatBooking CreateBooking(NeatBooking newBooking)
        {
            _context.NeatBookings.Add(newBooking);
            _context.SaveChanges();
            return newBooking;
        }

        public IEnumerable<NeatBooking> DeleteBooking(int id)
        {
            var deleteBooking = _context.NeatBookings.FirstOrDefault(b => b.BookingId == id);

            _context.NeatBookings.Remove(deleteBooking);
            _context.SaveChanges();
            return _context.NeatBookings;



        }

        public ICollection<NeatBooking> GetNextBooking()
        {
            var latestBooking = _context.NeatBookings
                  .OrderByDescending(b => b.DateTime)
                  .FirstOrDefault();

            return latestBooking != null ? new List<NeatBooking> { latestBooking } : new List<NeatBooking>();
        }
    }
}