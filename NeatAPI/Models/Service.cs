using System.ComponentModel.DataAnnotations;


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
