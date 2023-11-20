using System.ComponentModel.DataAnnotations.Schema;

namespace NeatAPI.Models
{
  public class Availability
  {
    public int AvailabilityId { get; set; }

    [ForeignKey("UserId")]
    public int UserId { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }
  }
}
