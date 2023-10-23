using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NeatAPI.Models;
using System.Security.Cryptography;

namespace NeatAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    public static User user = new User();

    [HttpPost("register")]
    public async Task<ActionResult<User>> Register(UserDto userDto)
    {
      CreatePasswordHash(userDto.Password, out byte[] passwordHash, out byte[] passwordSalt);
      user.UserName = userDto.UserName;
      user.PasswordHash = passwordHash;
      user.PasswordSalt = passwordSalt;

      return Ok(user);

    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login(UserDto userDto)
    {
      if(user.UserName != userDto.UserName)
      {
        return BadRequest();
      }

      return Ok("Token");
    }

    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
      using(var hmac = new HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
      }
    }
    
  }

  
}
