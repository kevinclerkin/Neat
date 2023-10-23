using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NeatAPI.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using NeatAPI.Data;
using NeatAPI.Interfaces;

namespace NeatAPI.Controllers
{

  [Route("api/[controller]")]
  [ApiController]
  public class NeatController : ControllerBase
  {
    private readonly INeatBookingRepository _neatBookingRepository;
    

    public NeatController(INeatBookingRepository neatBookingRepository)
    {
      _neatBookingRepository = neatBookingRepository;
    }




    // GET: api/<NeatController>
    [Authorize]
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<NeatBooking>), 200)]
    public IActionResult GetBookings()
    {
      var allBookings = _neatBookingRepository.GetBookings();

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      return Ok(allBookings);
    }
  

    //GET api/<NeatController>/
    [HttpGet("{clientEmail}")]
    [ProducesResponseType(typeof(IEnumerable<NeatBooking>), 200)]
    public IActionResult GetBookingsByClientEmail(string clientEmail)
    {
      var bookingsByEmail = _neatBookingRepository.GetBookingsByClientEmail(clientEmail);

      if(!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      return Ok(bookingsByEmail);
      
    }

    // POST api/<NeatController>/
    [HttpPost]
    [ProducesResponseType(typeof(NeatBooking), 200)]
    public IActionResult CreateBooking([FromBody] NeatBooking neatBooking)
    {
      if(neatBooking == null || !ModelState.IsValid)
      {
        return BadRequest("Invalid data; refer to schema");
      }

      _neatBookingRepository.CreateBooking(neatBooking);
      return Ok(neatBooking);
    }

    // PUT api/<NeatController>/
    //[HttpPut("{id}")]
    //public void Put(int id, [FromBody] string value)
    //{
    //}

    //DELETE api/<NeatController>/
    [HttpDelete("id")]
    public IActionResult DeleteBooking(int id)
    {
      var deleteBooking = _neatBookingRepository.DeleteBooking(id);

      if(deleteBooking == null)
      {
        return BadRequest();
      }

      return Ok(deleteBooking);
    }
  }
}
