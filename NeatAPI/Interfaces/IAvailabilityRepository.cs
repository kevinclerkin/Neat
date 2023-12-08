using NeatAPI.Models;

namespace NeatAPI.Interfaces
{
  public interface IAvailabilityRepository
  {
    ICollection<Availability> GetAvailabilities();

    ICollection<Availability> GetAvailabilityById(int id);

    Availability CreateAvailability(Availability availability);

    bool DeleteAvailability(Availability availability);
  }
}
