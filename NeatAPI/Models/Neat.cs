namespace NeatAPI.Models
{
    public class Neat
    {
        public int Id { get; set; }
        public String Service { get; set; }

        public String Available { get; set; }

        public DateTime DateTime { get; set; }

        public String ClientName { get; set; }

        public String ClientEmail { get; set; }
    }

  public class NeatRepo
  {
    private static List<Neat> _neatList = new List<Neat>()
    {
      new Neat { Id = 1, Service= "Dry Cut", Available = "Dave", DateTime = DateTime.Now, ClientName="Ronan Byrne", ClientEmail= "ronan.byrne@gmail.com"},
      new Neat { Id = 2, Service= "Beard Trim", Available = "Paul", DateTime = DateTime.Now, ClientName="Paul O'Neill", ClientEmail= "paul.oneill@gmail.com"},
      new Neat { Id = 1, Service= "Dry Cut & Shave", Available = "Dave", DateTime = DateTime.Now, ClientName="Pat Collins", ClientEmail= "pat.collins@gmail.com"},
      new Neat { Id = 1, Service= "Dry Cut", Available = "Ryan", DateTime = DateTime.Now, ClientName="Jason Davis", ClientEmail= "jason.davis@gmail.com"}
    };

    public IEnumerable<Neat> GetAll()
    {
      return _neatList;

    }



  }
}
