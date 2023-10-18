using FakeItEasy;
using FluentAssertions;
using NeatAPI.Controllers;
using NeatAPI.Data;
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
    private readonly DataContext _dataContext;
    public NeatControllerTests()
    {
      _dataContext = A.Fake<DataContext>();
    }

    [Fact]
    public async Task NeatController_GetAllBookings_ReturnOK()
    {
      //Arrange

      var bookings = A.Fake<List<NeatBooking>>();
      var controller = new NeatController(_dataContext);

      //Act

      var result = await controller.GetAllBookings();

      //Assert
      result.Should().NotBeNull();

    }
  }
}
