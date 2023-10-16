using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using NeatAPI.Models;


namespace NeatAPI.Data
{
  public class DataContext: DbContext, IDataService
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<NeatBooking> NeatBookings { get; set; }

    public async Task<IEnumerable<NeatBooking>> GetBookings()
    {
      return await NeatBookings.ToListAsync();
    }

    public async Task<IEnumerable<NeatBooking>> GetBookingsByClientEmail(string clientEmail)
    {
      return await NeatBookings.Where(b=> b.ClientEmail == clientEmail).ToListAsync();
    }

    public new int SaveChanges()
    {
      return base.SaveChanges();
    }

    public new EntityEntry<TEntity> Add<TEntity>(TEntity entry) where TEntity : class
    {
      return base.Add<TEntity>(entry);
    }
  }

  public interface IDataService{
    DbSet<NeatBooking> NeatBookings { get; }

    Task<IEnumerable<NeatBooking>> GetBookings();

    Task<IEnumerable<NeatBooking>> GetBookingsByClientEmail(string clientEmail);

    int SaveChanges();
    EntityEntry<TEntity> Add<TEntity>(TEntity entity) where TEntity : class;

  }
}
