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
    private readonly IDataService _dataService;

    public NeatController(IDataService dataService)
    {
      _dataService = dataService;
    }

    


    // GET: api/<NeatController>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<NeatBooking>>> Get()
    {
      var allBookings = await _dataService.NeatBookings.ToListAsync();
      return Ok(allBookings);
    }

    //GET api/<NeatController>/
    [HttpGet("{clientEmail}")]
    public async Task<ActionResult<IEnumerable<NeatBooking>>> GetByClientEmail(string clientEmail)
    {
      var neatBookings = await _dataService.NeatBookings.Where(b=> b.ClientEmail == clientEmail).ToListAsync();

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

      _dataService.Add(neatBooking);
      _dataService.SaveChanges();


      return Ok(_dataService.NeatBookings.ToList());
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
      var existingBooking = _dataService.NeatBookings.FirstOrDefault(b=> b.Id == id);

      if(existingBooking == null)
      {
        return NotFound();
      }

      _dataService.NeatBookings.Remove(existingBooking);
      _dataService.SaveChanges();

      return Ok(_dataService.NeatBookings.ToList());
    }
  }
}
