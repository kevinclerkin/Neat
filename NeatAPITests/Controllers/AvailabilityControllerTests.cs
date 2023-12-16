using FakeItEasy;
using Microsoft.AspNetCore.Mvc;
using NeatAPI.Controllers;
using NeatAPI.Interfaces;
using NeatAPI.Models;
using System.Collections.Generic;
using FluentAssertions;
using System;

public class AvailabilityControllerTests
{
    [Fact]
    public void GetAvailabilities_ReturnsOkObjectResult_WithAvailabilities()
    {
        // Arrange
        var repository = A.Fake<IAvailabilityRepository>();
        var controller = new AvailabilityController(repository);

        A.CallTo(() => repository.GetAvailabilities()).Returns(new List<Availability>());

        // Act
        var result = controller.GetAvailabilites();

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        var okResult = (OkObjectResult)result;
        okResult.Value.Should().BeAssignableTo<IEnumerable<Availability>>();
    }

    [Fact]
    public void GetAvailabilityById_ReturnsOkObjectResult_WithAvailability()
    {
        // Arrange
        var repository = A.Fake<IAvailabilityRepository>();
        var controller = new AvailabilityController(repository);
        var availabilityId = 1;

        A.CallTo(() => repository.GetAvailabilityById(availabilityId)).Returns(new Availability());

        // Act
        var result = controller.GetAvailabilityById(availabilityId);

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        var okResult = (OkObjectResult)result;
        okResult.Value.Should().BeAssignableTo<Availability>();
    }

    [Fact]
    public void AddAvailability_ReturnsOkObjectResult_WithAvailability()
    {
        // Arrange
        var repository = A.Fake<IAvailabilityRepository>();
        var controller = new AvailabilityController(repository);
        var availability = new Availability {AvailabilityId=1, TeamMemberId=2, DateTime= new DateTime()};

        // Act
        var result = controller.AddAvailability(availability);

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        var createdAtActionResult = (OkObjectResult)result;
        createdAtActionResult.Value.Should().BeSameAs(availability);
    }

    [Fact]
    public void DeleteAvailabilityById_WithValidId_ReturnsNoContent()
    {
        // Arrange
        var repository = A.Fake<IAvailabilityRepository>();
        var controller = new AvailabilityController(repository);
        var availabilityId = 1;

        A.CallTo(() => repository.GetAvailabilityById(availabilityId)).Returns(new Availability());

        // Act
        var result = controller.DeleteAvailabilityById(availabilityId);

        // Assert
        result.Should().BeOfType<NoContentResult>();
        A.CallTo(() => repository.DeleteAvailability(A<Availability>.Ignored)).MustHaveHappened();
    }

    

    [Fact]
    public void EditAvailability_ReturnsOkObjectResult_WithUpdatedAvailability()
    {
        // Arrange
        var repository = A.Fake<IAvailabilityRepository>();
        var controller = new AvailabilityController(repository);
        var availabilityId = 1;
        var editedAvailability = new Availability { AvailabilityId = 1, TeamMemberId = 2, DateTime = new DateTime()};

        A.CallTo(() => repository.EditAvailability(availabilityId, editedAvailability)).Returns(new Availability());

        // Act
        var result = controller.EditAvailability(availabilityId, editedAvailability);

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        var okResult = (OkObjectResult)result;
        okResult.Value.Should().BeAssignableTo<Availability>();
    }
}
