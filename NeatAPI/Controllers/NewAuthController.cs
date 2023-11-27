using Microsoft.AspNetCore.Mvc;
using NeatAPI.Models;
using System.Text.RegularExpressions;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NeatAPI.Utils;
using NeatAPI.Data;

namespace NeatAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class NewAuthController : ControllerBase
  {
    private readonly DataContext _context;

    public NewAuthController(DataContext context)
    {
      _context = context;
        
    }

    [HttpPost("authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] TeamMember memberObj)
    {
      if (memberObj == null)
        return BadRequest();

      var teamMember = await _context.TeamMembers
          .FirstOrDefaultAsync(x => x.Username == memberObj.Username);

      if (teamMember == null)
        return NotFound(new { Message = "User not found!" });

      if (!PasswordHashVerify.VerifyPassword(memberObj.Password, teamMember.Password))
      {
        return BadRequest(new { Message = "Password is Incorrect" });
      }

      teamMember.Token = CreateJwt(teamMember);
      var newAccessToken = teamMember.Token;
      var newRefreshToken = CreateRefreshToken();
      teamMember.RefreshToken = newRefreshToken;
      teamMember.RefreshTokenExpiryTime = DateTime.Now.AddDays(5);
      await _context.SaveChangesAsync();

      return Ok(new TokenDto()
      {
        AccessToken = newAccessToken,
        RefreshToken = newRefreshToken
      });
    }

    [HttpPost("register")]
    public async Task<IActionResult> AddUser([FromBody] TeamMember memberObj)
    {
      if (memberObj == null)
        return BadRequest();

      // check email
      if (await CheckEmailExistAsync(memberObj.Email))
        return BadRequest(new { Message = "Email Already Exist" });

      //check username
      if (await CheckUsernameExistAsync(memberObj.Username))
        return BadRequest(new { Message = "Username Already Exist" });

      var passMessage = CheckPasswordStrength(memberObj.Password);
      if (!string.IsNullOrEmpty(passMessage))
        return BadRequest(new { Message = passMessage.ToString() });

      memberObj.Password = PasswordHashVerify.HashPassword(memberObj.Password);
      memberObj.Role = "User";
      memberObj.Token = "";
      await _context.AddAsync(memberObj);
      await _context.SaveChangesAsync();
      return Ok(new
      {
        Status = 200,
        Message = "Team Member Added!"
      });
    }

    private Task<bool> CheckEmailExistAsync(string? email)
        => _context.TeamMembers.AnyAsync(x => x.Email == email);

    private Task<bool> CheckUsernameExistAsync(string? username)
        => _context.TeamMembers.AnyAsync(x => x.Email == username);

    private static string CheckPasswordStrength(string pass)
    {
      StringBuilder sb = new StringBuilder();
      if (pass.Length < 9)
        sb.Append("Minimum password length should be 8" + Environment.NewLine);
      if (!(Regex.IsMatch(pass, "[a-z]") && Regex.IsMatch(pass, "[A-Z]") && Regex.IsMatch(pass, "[0-9]")))
        sb.Append("Password should be AlphaNumeric" + Environment.NewLine);
      if (!Regex.IsMatch(pass, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
        sb.Append("Password should contain special charcter" + Environment.NewLine);
      return sb.ToString();
    }

    private string CreateJwt(TeamMember teamMember)
    {
      var jwtTokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes("veryverysceret.....");
      var identity = new ClaimsIdentity(new Claim[]
      {
                new Claim(ClaimTypes.Role, teamMember.Role),
                new Claim(ClaimTypes.Name,$"{teamMember.Username}")
      });

      var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = identity,
        Expires = DateTime.Now.AddSeconds(10),
        SigningCredentials = credentials
      };
      var token = jwtTokenHandler.CreateToken(tokenDescriptor);
      return jwtTokenHandler.WriteToken(token);
    }

    private string CreateRefreshToken()
    {
      var tokenBytes = RandomNumberGenerator.GetBytes(64);
      var refreshToken = Convert.ToBase64String(tokenBytes);

      var tokenInUse = _context.TeamMembers
          .Any(a => a.RefreshToken == refreshToken);
      if (tokenInUse)
      {
        return CreateRefreshToken();
      }
      return refreshToken;
    }

    private ClaimsPrincipal GetPrincipleFromExpiredToken(string token)
    {
      var key = Encoding.ASCII.GetBytes("veryverysceret.....");
      var tokenValidationParameters = new TokenValidationParameters
      {
        ValidateAudience = false,
        ValidateIssuer = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateLifetime = false
      };
      var tokenHandler = new JwtSecurityTokenHandler();
      SecurityToken securityToken;
      var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
      var jwtSecurityToken = securityToken as JwtSecurityToken;
      if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
        throw new SecurityTokenException("This is Invalid Token");
      return principal;

    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<TeamMember>> GetAllTeamMembers()
    {
      return Ok(await _context.TeamMembers.ToListAsync());
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] TokenDto tokenDto)
    {
      if (tokenDto is null)
        return BadRequest("Invalid Client Request");
      string accessToken = tokenDto.AccessToken;
      string refreshToken = tokenDto.RefreshToken;
      var principal = GetPrincipleFromExpiredToken(accessToken);
      var username = principal.Identity.Name;
      var user = await _context.TeamMembers.FirstOrDefaultAsync(u => u.Username == username);
      if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
        return BadRequest("Invalid Request");
      var newAccessToken = CreateJwt(user);
      var newRefreshToken = CreateRefreshToken();
      user.RefreshToken = newRefreshToken;
      await _context.SaveChangesAsync();
      return Ok(new TokenDto()
      {
        AccessToken = newAccessToken,
        RefreshToken = newRefreshToken,
      });
    }
  }

}

