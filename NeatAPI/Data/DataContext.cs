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

    public DbSet<Availability> Availabilities { get; set; }

    public DbSet<TeamMember> TeamMembers { get; set; }

    public DbSet<Company> Companies { get; set; }

    public DbSet<Customer> Customers { get; set; }

    public DbSet<Payment> Payments { get; set; }


    

  }

  


}
