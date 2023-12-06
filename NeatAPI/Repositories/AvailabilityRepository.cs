using NeatAPI.Data;
using NeatAPI.Interfaces;
using NeatAPI.Models;

namespace NeatAPI.Repositories
{
  public class AvailabilityRepository : IAvailabilityRepository
  {
    private readonly DataContext _context;

    public AvailabilityRepository(DataContext context)
    {
      _context = context;
    }

    public ICollection<Availability> GetAvailabilities()
    {
      DateTime now = DateTime.Now;

      return _context.Availabilities.Where(a => a.DateTime >= now)
        .OrderBy(a => a.DateTime).ToList();
    }


    public ICollection<Availability> GetAvailabilityByUser(int id)
    {
      return _context.Availabilities.Where(a => a.UserId == id).ToList();
    }


    public Availability CreateAvailability(Availability availability)
    {
      _context.Availabilities.Add(availability);
      _context.SaveChanges();
      return availability ;
    }

    public IEnumerable<Availability> DeleteAvailability(int id)
    {
      var deleteAvailability = _context.Availabilities.FirstOrDefault(b => b.AvailabilityId == id);

      _context.Availabilities.Remove(deleteAvailability);
      _context.SaveChanges();
      return _context.Availabilities;
    }

   
  }
}
