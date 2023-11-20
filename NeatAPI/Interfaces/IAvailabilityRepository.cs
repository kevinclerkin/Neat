using NeatAPI.Models;

namespace NeatAPI.Interfaces
{
  public interface IAvailabilityRepository
  {
    ICollection<Availability> GetAvailabilities();

    ICollection<Availability> GetAvailabilityByUser(string user);

    Availability CreateAvailability(Availability availability);

    ICollection<Availability> DeleteAvailability(int id);
  }
}
