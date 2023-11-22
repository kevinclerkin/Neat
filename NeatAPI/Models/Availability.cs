using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeatAPI.Models
{
  
  public class Availability
  {
    [Key]
    [Required]
    public int AvailabilityId { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }
    [Required]
    public DateTime StartTime { get; set; }

  }
}