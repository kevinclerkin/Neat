using NeatAPI.Models;

namespace NeatAPI.Interfaces
{
  public interface IAvailabilityRepository
  {
    ICollection<Availability> GetAvailabilities();

    Availability GetAvailabilityById(int id);

    Availability CreateAvailability(Availability availability);

    Availability DeleteAvailability(Availability availability);

    Availability EditAvailability (int id, Availability availability);
  }
}
