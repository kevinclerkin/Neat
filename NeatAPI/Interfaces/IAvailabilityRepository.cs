using NeatAPI.Models;

namespace NeatAPI.Interfaces
{
  public interface IAvailabilityRepository
  {
    ICollection<Availability> GetAvailabilities();

    ICollection<Availability> GetAvailabilityByUser(int user);

    Availability CreateAvailability(Availability availability);

    IEnumerable<Availability> DeleteAvailability(int id);
  }
}
