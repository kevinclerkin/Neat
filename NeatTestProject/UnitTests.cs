using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Moq;
using NeatAPI.Controllers;
using NeatAPI.Data;
using NeatAPI.Models;


namespace NeatTestProject
{
  public class NeatControllerTests
  {
    [Fact]
    public async Task Get_ReturnsAllBookings()
    {

      var mockDataService = new Mock<IDataService>();
      mockDataService.Setup(d => d.GetBookings())
        .ReturnsAsync(new List<NeatBooking>
        {
          new NeatBooking

          { Id = 1, Service = "Dry Cut", Available = "Alan", DateTime = DateTime.Now, ClientName = "Tom", ClientEmail = "tom.jones@gmail.com"},

          new NeatBooking

          { Id = 2, Service = "Beard Trim", Available = "Rob", DateTime = DateTime.Now, ClientName = "Mike", ClientEmail = "mike.pence@gmail.com"}
        });

      var controller = new NeatController(mockDataService.Object);

      var result = await controller.Get();

      var okResult = Assert.IsType<OkObjectResult>(result);
      var bookings = Assert.IsAssignableFrom<IEnumerable<NeatBooking>>(okResult.Value);
      Assert.Single(bookings);
    }

    [Fact]
    public async Task GetByClientEmail_ReturnsBookingsByClientEmail()
    {
      var mockDataService = new Mock<IDataService>();
      mockDataService.Setup(d => d.GetBookingsByClientEmail("tom.jones@gmail.com"))
        .ReturnsAsync(new List<NeatBooking>
        {
          new NeatBooking {Id = 1, Service = "Dry Cut", Available = "Alan", DateTime = DateTime.Now, ClientName = "Tom", ClientEmail = "tom.jones@gmail.com"}
        });

      var controller = new NeatController(mockDataService.Object);

      var result = await controller.GetByClientEmail("tom.jones@gmail.com");

      var okResult = Assert.IsType<OkObjectResult>(result);
      var bookings = Assert.IsAssignableFrom<IEnumerable<NeatBooking>>(okResult.Value);
      Assert.Single(bookings);
    }



} }
