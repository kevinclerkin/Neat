using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace NeatAPI.Models
{
    public class Neat
    {
        public int Id { get; set; }
        [Required]
        public String Service { get; set; }
        [Required]
        public String Available { get; set; }

        public DateTime DateTime { get; set; }
        [Required]
        public String ClientName { get; set; }

        [Required]
        [EmailAddress]

        public String ClientEmail { get; set; }
    }

  public class NeatRepo
  {
    private static List<Neat> _neatList = new List<Neat>()
    {
      new Neat { Id = 1, Service= "Dry Cut", Available = "Dave", DateTime = DateTime.Now, ClientName="Ronan Byrne", ClientEmail= "ronan.byrne@gmail.com"},
      new Neat { Id = 2, Service= "Beard Trim", Available = "Paul", DateTime = DateTime.Now, ClientName="Paul O'Neill", ClientEmail= "paul.oneill@gmail.com"},
      new Neat { Id = 3, Service= "Dry Cut & Shave", Available = "Dave", DateTime = DateTime.Now, ClientName="Pat Collins", ClientEmail= "pat.collins@gmail.com"},
      new Neat { Id = 4, Service= "Dry Cut", Available = "Ryan", DateTime = DateTime.Now, ClientName="Jason Davis", ClientEmail= "jason.davis@gmail.com"}
    };

    public IEnumerable<Neat> GetAll()
    {
      return _neatList;

    }

    public void Add(Neat neatbooking)
    {
      neatbooking.Id = _neatList.Count + 1;
      _neatList.Add(neatbooking);
    }



  }
}
