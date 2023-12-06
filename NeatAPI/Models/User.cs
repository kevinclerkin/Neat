using System.ComponentModel.DataAnnotations;

namespace NeatAPI.Models
{

    public class User
    {
        [Key]
        [Required]
        public int UserId { get; set; }

        public string Name { get; set; }
        [Required]
        public string UserName { get; set; } = string.Empty;
        [Required]
        public byte[] PasswordHash { get; set; }
        [Required]
        public byte[] PasswordSalt { get; set; }

      
        public List<NeatBooking> UserBookings { get; set; }
        
        public List<Availability> UserAvailabilities { get; set; }


    }



}
