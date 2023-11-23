using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NeatAPI.Data;
using NeatAPI.Models;

namespace NeatAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private readonly DataContext _context;

    public UserController(DataContext context)
    {
      _context = context;
        
    }

    [HttpGet]
    public ActionResult<IEnumerable<User>> GetUsers()
    {
      return _context.Users.OrderBy(u => u.UserName).ToList();
    }

    [HttpGet("get-user-names")]
    public ActionResult<IEnumerable<string>> GetUserNames()
    {
      var userNames = _context.Users
        .OrderBy(u => u.Name)
        .Select(u => u.Name)
        .ToList();

      return userNames;


    }
  }
}
