using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NeatAPI.Interfaces;
using NeatAPI.Models;


namespace NeatAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class NeatServiceController : ControllerBase
  {
    private readonly INeatServiceRepository _serviceRepository;

    public NeatServiceController(INeatServiceRepository serviceRepository)
    {
        _serviceRepository = serviceRepository;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Service>), 200)]
    public IActionResult GetServices()
    {
      var allServices = _serviceRepository.GetAllServices();

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      return Ok(allServices);
    }
    [Authorize]
    [HttpPost]
    [ProducesResponseType(typeof(Service), 200)]
    public IActionResult CreateNeatService([FromBody] Service service)
    {
      if (service == null || !ModelState.IsValid)
      {
        return BadRequest("Invalid data; refer to schema");
      }

      _serviceRepository.CreateService(service);
      return Ok(service);
    }


    [Authorize]
    [HttpDelete("id")]
    public IActionResult DeleteNeatService(int id)
    {
      var deleteService = _serviceRepository.DeleteService(id);

      if (deleteService == null)
      {
        return BadRequest();
      }

      return Ok(deleteService);
    }
  }
}
