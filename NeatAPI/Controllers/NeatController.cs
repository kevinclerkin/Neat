using Microsoft.AspNetCore.Mvc;
using NeatAPI.Models;
using System.Collections.Generic;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NeatAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class NeatController : ControllerBase
  {
    private readonly NeatRepo _repo;

    public NeatController(NeatRepo repo)
    {
      _repo = repo;
    }


    // GET: api/<NeatController>
    [HttpGet]
    public ActionResult<IEnumerable<Neat>> Get()
    {
      var neatList = _repo.GetAll();
      return Ok(neatList);
    }

    //GET api/<NeatController>/5
    [HttpGet("{clientEmail}")]
    public ActionResult<IEnumerable<Neat>> GetClientEmail(string clientEmail)
    {
      var neatBooking = _repo.GetAll().FirstOrDefault(e=> e.ClientEmail == clientEmail);

      if(neatBooking == null)
      {
        return NotFound();
      }

      return Ok(neatBooking);
      
    }

    // POST api/<NeatController>
    [HttpPost]
    public ActionResult<Neat> Post([FromBody] Neat neatBooking)
    {
      if(neatBooking == null)
      {
        return BadRequest("Invalid data; refer to schema");
      }

      _repo.Add(neatBooking);
      

      return CreatedAtAction(nameof(GetClientEmail), new { clientEmail = neatBooking.ClientEmail }, neatBooking);
    }

    // PUT api/<NeatController>/5
    //[HttpPut("{id}")]
    //public void Put(int id, [FromBody] string value)
    //{
    //}

    // DELETE api/<NeatController>/5
    //[HttpDelete("{id}")]
    //public void Delete(int id)
    //{
    //}
  }
}
