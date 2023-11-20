using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace NeatAPI.Models
{
    public class NeatBooking
    {
        public int BookingId { get; set; }
        [Required]

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
