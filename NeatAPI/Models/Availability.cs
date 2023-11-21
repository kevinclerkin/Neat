using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeatAPI.Models
{
  
  public class Availability
  {
    [Key]
    public int AvailabilityId { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }

    public virtual User User { get; set; }

    public DateTime StartTime { get; set; }

  }
}
