using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeatAPI.Models
{
    
    public class NeatBooking
    {
        [Key]
        public int BookingId { get; set; }
        [Required]

        [ForeignKey("UserId")]
        public int UserId { get; set; }

        public String Service { get; set; }

        [Required]
        public int AvailabilityId { get; set; }

        public DateTime BookingTime { get; set; }

        [Required]
        public String ClientName { get; set; }

        [Required]
        [EmailAddress]

        public String ClientEmail { get; set; }
    }

  



  
}
