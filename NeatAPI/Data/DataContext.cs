using Microsoft.EntityFrameworkCore;
using NeatAPI.Models;


namespace NeatAPI.Data
{
  public class DataContext: DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<Neat> NeatBookings { get; set; }
  }
}
