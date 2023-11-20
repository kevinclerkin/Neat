using System.ComponentModel.DataAnnotations.Schema;

namespace NeatAPI.Models
{
  public class Service
  {
    public int ServiceId { get; set; }

    public String ServiceName { get; set; }

    [ForeignKey("BookingId")]
    public int BookingId { get; set; }

    
  }
}
