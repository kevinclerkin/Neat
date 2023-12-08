using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Diagnostics;
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


    public Availability GetAvailabilityById(int id)
    {
      return _context.Availabilities.FirstOrDefault(a => a.AvailabilityId == id);
    }


    public Availability CreateAvailability(Availability availability)
    {
      _context.Availabilities.Add(availability);
      _context.SaveChanges();
      return availability ;
    }

    
    public Availability DeleteAvailability(Availability availability)
    {
      _context.Availabilities.Remove(availability);
      _context.SaveChanges();
      return availability;

    }
  
  
  }

}
