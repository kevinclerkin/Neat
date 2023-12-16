using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NeatAPI.Controllers;
using NeatAPI.Interfaces;
using NeatAPI.Models;
using System.Collections.Generic;
using Xunit;

public class NeatServiceControllerTests
{
    [Fact]
    public void GetServices_ReturnsOkObjectResult_WithServices()
    {
        // Arrange
        var repository = A.Fake<INeatServiceRepository>();
        var controller = new NeatServiceController(repository);

        A.CallTo(() => repository.GetAllServices()).Returns(new List<Service>());

        // Act
        var result = controller.GetServices();

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        var okResult = (OkObjectResult)result;
        okResult.Value.Should().BeAssignableTo<IEnumerable<Service>>();
    }

    [Fact]
    public void CreateNeatService_WithValidService_ReturnsOkObjectResult_WithService()
    {
        // Arrange
        var repository = A.Fake<INeatServiceRepository>();
        var controller = new NeatServiceController(repository);
        var service = new Service {ServiceId=1, ServiceName= "Dry Cut", Price= 25 };

        // Act
        var result = controller.CreateNeatService(service);

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        var okResult = (OkObjectResult)result;
        okResult.Value.Should().BeSameAs(service);
    }


    [Fact]
    public void EditService_WithValidIdAndEditedService_ReturnsOkObjectResult_WithUpdatedService()
    {
        // Arrange
        var repository = A.Fake<INeatServiceRepository>();
        var controller = new NeatServiceController(repository);
        
        var editedService = new Service {ServiceId=1, ServiceName= "Dry Cut", Price = 25 };

        A.CallTo(() => repository.EditService(editedService.ServiceId, editedService)).Returns(new Service());

        // Act
        var result = controller.EditService(editedService.ServiceId, editedService);

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        var okResult = (OkObjectResult)result;
        okResult.Value.Should().BeAssignableTo<Service>();
    }

    [Fact]
    public void DeleteNeatService_WithValidId_ReturnsOkObjectResult_WithDeletedServicesList()
    {
        // Arrange
        var repository = A.Fake<INeatServiceRepository>();
        var controller = new NeatServiceController(repository);
        var serviceId = 1;
       

        
        var remainingServices = new List<Service>{};
        A.CallTo(() => repository.DeleteService(serviceId)).Returns(remainingServices);

        // Act
        var result = controller.DeleteNeatService(serviceId);

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        var okResult = (OkObjectResult)result;
        okResult.Value.Should().BeAssignableTo<List<Service>>().And.BeEquivalentTo(remainingServices);
    }


}