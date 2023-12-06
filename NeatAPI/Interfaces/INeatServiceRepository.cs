using NeatAPI.Models;

namespace NeatAPI.Interfaces
{
  public interface INeatServiceRepository
  {
    ICollection<Service> GetAllServices();

    Service CreateService(Service service);

    IEnumerable<Service> DeleteService(int id);
  }
}
