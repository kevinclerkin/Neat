using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NeatAPI.Data;
using NeatAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace NeatAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    public static User user = new User();

    private readonly DataContext _context;

    private readonly IConfiguration _configuration;

    public AuthController(IConfiguration configuration, DataContext context)
    {
      _configuration = configuration;
      _context = context;
    }

    [HttpPost("register")]
    public Task<ActionResult<User>> Register(UserDto userDto)
    {
      CreatePasswordHash(userDto.Password, out byte[] passwordHash, out byte[] passwordSalt);
      user.UserName = userDto.UserName;
      user.PasswordHash = passwordHash;
      user.PasswordSalt = passwordSalt;
      _context.Users.Add(user);
      _context.SaveChanges();
      return Task.FromResult<ActionResult<User>>(Ok(user));

    }

    [HttpPost("login")]
    public Task<ActionResult<string>> Login(UserDto userDto)
    {
      if(user.UserName != userDto.UserName)
      {
        return Task.FromResult<ActionResult<string>>(BadRequest());
      }

      if(!VerifyPasswordHash(userDto.Password, user.PasswordHash, user.PasswordSalt))
      {
        return Task.FromResult<ActionResult<string>>(BadRequest());
      }

      string token = CreateToken(user);

      return Task.FromResult<ActionResult<string>>(Ok(token));
    }

    private string CreateToken(User user)
    {
      List<Claim> claims = new List<Claim>
      {
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim(ClaimTypes.Role, "Admin")
      };

      var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
        _configuration.GetSection("AppSettings:Token").Value));

      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

      var token = new JwtSecurityToken(
        claims: claims,
        expires: DateTime.Now.AddDays(1),
        signingCredentials: creds);

      var jwt = new JwtSecurityTokenHandler().WriteToken(token);

      return jwt;
      
    }

    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
      using(var hmac = new HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
      }
    }

    private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
    {
  
      using(var hmac = new HMACSHA512(passwordSalt))
      {
        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        return computedHash.SequenceEqual(passwordHash);
      }
    }
    
  }


  
}
