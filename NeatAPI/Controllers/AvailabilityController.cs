using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NeatAPI.Data;

namespace NeatAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AvailabilityController : ControllerBase
  {
    private readonly DataContext _context;
    public AvailabilityController(DataContext context)
    {
      _context = context;
    }

    
  }
}
