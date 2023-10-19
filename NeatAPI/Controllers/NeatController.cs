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
  }
}
    //GET api/<NeatController>/
    /*[HttpGet("{clientEmail}")]
    public async Task<ActionResult<IEnumerable<NeatBooking>>> GetByClientEmail(string clientEmail)
    {
      var neatBookings = await _dataContext.NeatBookings.Where(b=> b.ClientEmail == clientEmail).ToListAsync();

      if(neatBookings == null)
      {
        return NotFound();
      }

      return Ok(neatBookings);
      
    }

    // POST api/<NeatController>/
    [HttpPost]
    public ActionResult<NeatBooking> Post([FromBody] NeatBooking neatBooking)
    {
      if(neatBooking == null)
      {
        return BadRequest("Invalid data; refer to schema");
      }

      _dataContext.Add(neatBooking);
      _dataContext.SaveChanges();


      return Ok(_dataContext.NeatBookings.ToList());
    }

    // PUT api/<NeatController>/
    //[HttpPut("{id}")]
    //public void Put(int id, [FromBody] string value)
    //{
    //}

    //DELETE api/<NeatController>/
    [HttpDelete("id")]
    public ActionResult Delete(int id)
    {
      var existingBooking = _dataContext.NeatBookings.FirstOrDefault(b=> b.Id == id);

      if(existingBooking == null)
      {
        return NotFound();
      }

      _dataContext.NeatBookings.Remove(existingBooking);
      _dataContext.SaveChanges();

      return Ok(_dataContext.NeatBookings.ToList());
    }
  }
}*/
