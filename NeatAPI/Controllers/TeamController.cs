using Microsoft.AspNetCore.Mvc;
using NeatAPI.Interfaces;

namespace NeatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ITeamMember _teamMemberRepository;

        public TeamController(ITeamMember teamMemberRepository)
        {
            _teamMemberRepository = teamMemberRepository;
        }

        // GET: api/TeamMember
        [HttpGet]
        public IActionResult GetTeamMembers()
        {
            var teamMembers = _teamMemberRepository.GetTeamMembers();
            return Ok(teamMembers);
        }

        // GET: api/TeamMember/names
        [HttpGet("names")]
        public IActionResult GetTeamMemberNames()
        {
            var teamMemberNames = _teamMemberRepository.GetTeamMemberNames();
            return Ok(teamMemberNames);
        }
    }
}
