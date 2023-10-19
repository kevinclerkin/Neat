using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NeatAPI.Controllers;
using NeatAPI.Data;
using NeatAPI.Interfaces;
using NeatAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NeatTestProject.Controller
{
  public class NeatControllerTests
  {
    private readonly INeatBookingRepository _neatBookingRepository;
    public NeatControllerTests()
    {
      _neatBookingRepository = A.Fake<INeatBookingRepository>();
    }

    [Fact]
    public void NeatController_GetBookings_ReturnOK()
    {
      //Arrange

      //var bookings = A.Fake<ICollection<NeatBooking>>();
      var bookingList = A.Fake<List<NeatBooking>>();
      A.CallTo(() => _neatBookingRepository.GetBookings()).Returns(bookingList);
      var controller = new NeatController(_neatBookingRepository);

      //Act

      var result = controller.GetBookings();

      //Assert
      result.Should().NotBeNull();
      result.Should().BeOfType(typeof(OkObjectResult));
      

    }
  }
}
