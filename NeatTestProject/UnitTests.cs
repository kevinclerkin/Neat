using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.InMemory;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using NeatAPI.Controllers;
using NeatAPI.Data;
using NeatAPI.Models;
using Xunit;
using Microsoft.EntityFrameworkCore;

namespace NeatTestProject
{
  [Collection("Database")]
  public class NeatControllerTests
  {
    private readonly DatabaseFixture _fixture;
    private readonly DataContext _context;

    public NeatControllerTests(DatabaseFixture fixture)
    {
      _fixture = fixture;
      _context = _fixture.Context;

      _context.NeatBookings.Add(new NeatBooking
      {
        Service = "Dry Cut",
        Available = "Rob",
        DateTime = DateTime.Now,
        ClientName = "Tom",
        ClientEmail = "tom.harris@gmail.com"
      });
      _context.NeatBookings.Add(new NeatBooking
      {
        Service = "Beard Trim",
        Available = "Alan",
        DateTime = DateTime.Now,
        ClientName = "Brian",
        ClientEmail = "brian.grimes@gmail.com"
      });
      _context.SaveChanges();
    }

    [Fact]
    public async Task Get_ReturnsAllBookings()
    {
      var controller = new NeatController(_context);

      var result = await controller.Get();

      var okResult = Assert.IsType<OkObjectResult>(result);
      var bookings = Assert.IsAssignableFrom<IEnumerable<NeatBooking>>(okResult.Value);
    }

    [Fact]
    public async Task GetByClientEmail_ReturnsBookingsByClientEmail()
    {
      var controller = new NeatController(_context);
      string clientEmail = "tom.harris@gmail.com";

      var result = await controller.GetByClientEmail(clientEmail);

      var okResult = Assert.IsType<OkObjectResult>(result);
      var bookings = Assert.IsAssignableFrom<IEnumerable<NeatBooking>>(okResult.Value);


      Assert.Single(bookings);
    }
  }


  public class DatabaseFixture : IDisposable
  {


    public DataContext Context { get; private set; }

    public DatabaseFixture()
    {
      var options = new DbContextOptionsBuilder<DataContext>()
          .UseInMemoryDatabase(databaseName: "InMemoryDatabase")
          .Options;

      Context = new TestDataContext(options);
      Context.Database.EnsureCreated();
    }

    public void Dispose()
    {
      Context.Database.EnsureDeleted();
      Context.Dispose();
    }

    public class TestDataContext : DataContext
    {
      public TestDataContext(DbContextOptions<DataContext> options)
          : base(options)
      {
      }
    }
  }
}
