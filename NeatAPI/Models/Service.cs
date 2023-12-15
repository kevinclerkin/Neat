using System.ComponentModel.DataAnnotations;


namespace NeatAPI.Models
{

    public class Service
    {
        [Key]
        public int ServiceId { get; set; }
        [Required]
        public string ServiceName { get; set; }

        public int Price { get; set; }

    }
}
