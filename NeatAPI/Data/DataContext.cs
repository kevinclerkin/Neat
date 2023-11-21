using Microsoft.EntityFrameworkCore;
using NeatAPI.Models;


namespace NeatAPI.Data
{
  public class DataContext: DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<NeatBooking> NeatBookings { get; set; }

    public DbSet<User> Users { get; set; }

    public DbSet<Service> Services { get; set; }

    

  }

  


}
