using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NeatAPI.Data;
using NeatAPI.Interfaces;
using NeatAPI.Models;
using NeatAPI.Repositories;

namespace NeatAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AvailabilityController : ControllerBase
  {
    private readonly IAvailabilityRepository _availabilityRepository;

    public AvailabilityController(IAvailabilityRepository availabilityRepository)
    {
      _availabilityRepository = availabilityRepository;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Availability>), 200)]
    public IActionResult GetAvailabilites()
    {
      var allAvailabilities = _availabilityRepository.GetAvailabilities();

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      return Ok(allAvailabilities);
    }

    [HttpGet("{userId}")]
    [ProducesResponseType(typeof(IEnumerable<Availability>), 200)]
    public IActionResult GetAvailabilityById(int userId)
    {
      var availabilityByUser = _availabilityRepository.GetAvailabilityByUser(userId);

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      return Ok(availabilityByUser);

    }

    [HttpPost]
    [ProducesResponseType(typeof(Availability), 200)]
    public IActionResult AddAvailability([FromBody] Availability availability)
    {
      if (availability == null || !ModelState.IsValid)
      {
        return BadRequest("Invalid data; refer to schema");
      }

      _availabilityRepository.CreateAvailability(availability);
      return Ok(availability);
    }

    [HttpDelete("id")]
    public IActionResult DeleteAvailability(int id)
    {
      var deleteAvailability = _availabilityRepository.DeleteAvailability(id);

      if (deleteAvailability == null)
      {
        return BadRequest();
      }

      return Ok(deleteAvailability);
    }


  }
}
