using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NeatAPI.Models;
using NeatAPI.Interfaces;


namespace NeatAPI.Controllers
{

  [Route("api/[controller]")]
  [ApiController]
  public class NeatController : ControllerBase
  {
    private readonly INeatBookingRepository _neatBookingRepository;
    private readonly IEmailService _emailService;
    private readonly ILogger<NeatController> _logger;


    public NeatController(INeatBookingRepository neatBookingRepository, IEmailService emailService, ILogger<NeatController> logger)
    {
      _neatBookingRepository = neatBookingRepository;
      _emailService = emailService;
      _logger = logger;
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

      // Send confirmation email
      var emailSubject = "Booking Confirmation";
      
      var formattedDateTime = neatBooking.DateTime.ToString("dddd - dd/MM/yyyy - HH:mm");


      var emailBody = $"Thank you for your booking, {neatBooking.ClientName}." +
                      $"Your booking is on: {formattedDateTime}.";

      
      var clientEmail = neatBooking.ClientEmail;

      _emailService.SendBookingConfirmationEmail(clientEmail, emailSubject, emailBody);

      return Ok(neatBooking);

    }

        // PUT api/<NeatController>/
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //DELETE api/<NeatController>/

    [Authorize]
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
