using System;
using System.Collections.Generic;
using System.Linq;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NeatAPI.Controllers;
using NeatAPI.Interfaces;
using NeatAPI.Models;
using Xunit;

public class NeatControllerTests
{
    [Fact]
    public void GetBookings_ReturnsOkObjectResult_WithBookings()
    {
        // Arrange
        var repository = A.Fake<INeatBookingRepository>();
        var emailService = A.Fake<IEmailService>();
        var logger = A.Fake<ILogger<NeatController>>();

        var neatController = new NeatController(repository, emailService, logger);

        
        A.CallTo(() => repository.GetBookings()).Returns(new List<NeatBooking>());

        // Act
        var result = neatController.GetBookings();

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        var okResult = (OkObjectResult)result;
        okResult.Value.Should().BeAssignableTo<IEnumerable<NeatBooking>>();
    }

    [Fact]
    public void GetBookingsByClientEmail_ReturnsOkObjectResult_WithBookings()
    {
        // Arrange
        var repository = A.Fake<INeatBookingRepository>();
        var emailService = A.Fake<IEmailService>();
        var logger = A.Fake<ILogger<NeatController>>();

        var neatController = new NeatController(repository, emailService, logger);
        var clientEmail = "test@example.com";

        
        A.CallTo(() => repository.GetBookingsByClientEmail(clientEmail)).Returns(new List<NeatBooking>());

        // Act
        var result = neatController.GetBookingsByClientEmail(clientEmail);

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        var okResult = (OkObjectResult)result;
        okResult.Value.Should().BeAssignableTo<IEnumerable<NeatBooking>>();
    }

    [Fact]
    public void CreateBooking_ReturnsOkObjectResult_WithNeatBooking()
    {
        // Arrange
        var repository = A.Fake<INeatBookingRepository>();
        var emailService = A.Fake<IEmailService>();
        var logger = A.Fake<ILogger<NeatController>>();

        var neatController = new NeatController(repository, emailService, logger);
        var neatBooking = new NeatBooking { BookingId = 1, ClientName = "Steve", ClientEmail = "steve.davis@gmail.com", ServiceId = 2, TeamMemberId = 1, DateTime = new DateTime() };

        // Act
        var result = neatController.CreateBooking(neatBooking);

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        var okResult = (OkObjectResult)result;
        okResult.Value.Should().BeSameAs(neatBooking);
    }

    [Fact]
    public void DeleteBooking_WithValidId_ReturnsOkObjectResult_WithDeletedBooking()
    {
        // Arrange
        var repository = A.Fake<INeatBookingRepository>();
        var emailService = A.Fake<IEmailService>();
        var logger = A.Fake<ILogger<NeatController>>();

        var neatController = new NeatController(repository, emailService, logger);
        var neatBooking = new NeatBooking { BookingId=1, ClientName="Steve", ClientEmail="steve.davis@gmail.com", ServiceId=2, TeamMemberId=1, DateTime=new DateTime()};

       
        A.CallTo(() => repository.DeleteBooking(neatBooking.BookingId));

        
        // Act
        var result = neatController.DeleteBooking(neatBooking.BookingId);

        

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        A.CallTo(() => repository.DeleteBooking(neatBooking.BookingId)).MustHaveHappened();
       
        
    }

    [Fact]
    public void DeleteBooking_WithInvalidId_ReturnsBadRequest()
    {
        // Arrange
        var repository = A.Fake<INeatBookingRepository>();
        var emailService = A.Fake<IEmailService>();
        var logger = A.Fake<ILogger<NeatController>>();

        var neatController = new NeatController(repository, emailService, logger);
        var invalidBookingId = 0;

        A.CallTo(() => repository.DeleteBooking(invalidBookingId))!.Returns(null);

        
        // Act
        var result = neatController.DeleteBooking(invalidBookingId);

        // Assert
        result.Should().BeOfType<BadRequestResult>();
    }

    [Fact]
    public void GetNextBooking_ReturnsOkObjectResult_WithNextBooking()
    {
        // Arrange
        var repository = A.Fake<INeatBookingRepository>();
        var emailService = A.Fake<IEmailService>();
        var logger = A.Fake<ILogger<NeatController>>();

        var neatController = new NeatController(repository, emailService, logger);

        
        A.CallTo(() => repository.GetNextBooking()).Returns(new List<NeatBooking>());

        
        // Act
        var result = neatController.GetNextBooking();

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        var okResult = (OkObjectResult)result;
        okResult.Value.Should().BeAssignableTo<IEnumerable<NeatBooking>>();
    }
}