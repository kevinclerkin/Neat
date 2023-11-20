namespace NeatAPI.Models
{
  public class Availability
  {
    public int AvailabilityId { get; set; }

    public int UserId { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }
  }
}
