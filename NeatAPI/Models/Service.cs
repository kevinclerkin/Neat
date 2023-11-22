using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeatAPI.Models
{
  
  public class Service
  {
    [Key]
    public int ServiceId { get; set; }

    [Required]
    public String ServiceName { get; set; }

  }
}
