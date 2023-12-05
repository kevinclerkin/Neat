using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NeatAPI.Models
{

    public class Availability
    {
        [Key]
        [Required]
        public int AvailabilityId { get; set; }

        [ForeignKey("TeamMember")]
        public int Id { get; set; }
        [Required]
        public DateTime DateTime { get; set; }

    }
}
