using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace NeatAPI.Models
{
    public class NeatBooking
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
    private static List<NeatBooking> _neatList = new List<NeatBooking>()
    {
      new NeatBooking { Id = 1, Service= "Dry Cut", Available = "Dave", DateTime = DateTime.Now, ClientName="Ronan Byrne", ClientEmail= "ronan.byrne@gmail.com"},
      new NeatBooking { Id = 2, Service= "Beard Trim", Available = "Paul", DateTime = DateTime.Now, ClientName="Paul O'Neill", ClientEmail= "paul.oneill@gmail.com"},
      new NeatBooking { Id = 3, Service= "Dry Cut & Shave", Available = "Dave", DateTime = DateTime.Now, ClientName="Pat Collins", ClientEmail= "pat.collins@gmail.com"},
      new NeatBooking { Id = 4, Service= "Dry Cut", Available = "Ryan", DateTime = DateTime.Now, ClientName="Jason Davis", ClientEmail= "jason.davis@gmail.com"}
    };

    public IEnumerable<NeatBooking> GetAll()
    {
      return _neatList;

    }

    public void Add(NeatBooking neatbooking)
    {
      neatbooking.Id = _neatList.Count + 1;
      _neatList.Add(neatbooking);
    }

    public void Delete(int id)
    {
      var removeBooking = _neatList.FirstOrDefault(b => b.Id == id);

      if (removeBooking != null)
      {
        _neatList.Remove(removeBooking);
      }
    }



  }
}
