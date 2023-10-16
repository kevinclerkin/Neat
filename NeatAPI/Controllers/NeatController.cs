using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NeatAPI.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using NeatAPI.Data;



namespace NeatAPI.Controllers
{
  
  [Route("api/[controller]")]
  [ApiController]
  public class NeatController : ControllerBase
  {
    private readonly DataContext _dataContext;

    public NeatController(DataContext context)
    {
      _dataContext = context;
    }


    // GET: api/<NeatController>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<NeatBooking>>> Get()
    {
      var allBookings = await _dataContext.NeatBookings.ToListAsync();
      return Ok(allBookings);
    }

    //GET api/<NeatController>/
    [HttpGet("{clientEmail}")]
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
}
