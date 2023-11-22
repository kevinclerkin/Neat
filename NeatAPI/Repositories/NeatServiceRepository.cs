using Microsoft.EntityFrameworkCore;
using NeatAPI.Data;
using NeatAPI.Interfaces;
using NeatAPI.Models;

namespace NeatAPI.Repositories
{
  public class NeatServiceRepository : INeatServiceRepository
  {
    private readonly DataContext _context;

    public NeatServiceRepository(DataContext context)
    {
        _context = context;
    }

    public ICollection<Service> GetAllServices()
    {
      return _context.Services.OrderBy(a => a.ServiceId).ToList();
    }

    public Service CreateService(Service service)
    {
      _context.Services.Add(service);
      _context.SaveChanges();
      return service;
    }

    public IEnumerable<Service> DeleteService(int id)
    {
      var deleteService = _context.Services.FirstOrDefault(b => b.ServiceId == id);

      _context.Services.Remove(deleteService);
      _context.SaveChanges();
      return _context.Services;
    }

    
  }
}
