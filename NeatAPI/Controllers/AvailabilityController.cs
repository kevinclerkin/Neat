using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NeatAPI.Interfaces;
using NeatAPI.Models;


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

        [HttpGet("{Id}")]
        [ProducesResponseType(typeof(IEnumerable<Availability>), 200)]
        public IActionResult GetAvailabilityById(int Id)
        {
            var availabilityById = _availabilityRepository.GetAvailabilityById(Id);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(availabilityById);

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


        [HttpDelete("delete")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteAvailability(int availabilityId)
        {

            var deleteAvailability = _availabilityRepository.GetAvailabilityById(availabilityId);

            if (deleteAvailability != null && ModelState.IsValid)
            {
                _availabilityRepository.DeleteAvailability((Availability)deleteAvailability);
            }


            return Ok(deleteAvailability);

                
            
            
            
        }



        

    }



}

