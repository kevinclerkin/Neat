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

        [ForeignKey("TeamMember")]
        public int TeamMemberId { get; set; }


        [ForeignKey("Service")]
        public int ServiceId { get; set; }

        [Required]
        public DateTime DateTime { get; set; }

        

    }






}
