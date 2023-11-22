using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeatAPI.Models
{
    
    public class NeatBooking
    {
        [Key]
        [Required]
        public int BookingId { get; set; }

        [Required]
        public String ClientName { get; set; }

        [Required]
        [EmailAddress]

        public String ClientEmail { get; set; }

        [Required]
        public DateTime StartTime { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }


        [ForeignKey("Service")]
        public int ServiceId { get; set; }

    }

  



  
}
