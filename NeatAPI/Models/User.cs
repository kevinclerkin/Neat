namespace NeatAPI.Models
{
  public class User
  {
    public int UserId { get; set; }

    public string Name { get; set; }
    
    public string UserName { get; set; } = string.Empty;

    public byte[] PasswordHash { get; set; }

    public byte[] PasswordSalt { get; set; }

    public List<NeatBooking> UserBookings { get; set; } = new List<NeatBooking>();

    public List<Availability> UserAvailabilities { get; set; } = new List<Availability>();

   
  }



  /*public class UserRepo
  {
    private readonly List<User> _users;

    public UserRepo()
    {
      _users = new List<User>();
    }

    public User Registration(string username, string password, string email)
    {
      if (_users.Any(u => u.UserName == username) || _users.Any(u => u.Email == email))
      {
        throw new ApplicationException("Username or email is already taken!");

      }

      string hashedPassword = HashPassword(password);

      var newUser = new User()
      {
        Id = _users.Count + 1,
        UserName = username,
        Email = email,
        Password = password
      };

      _users.Add(newUser);

      return newUser;

    }

    public User Login(string username, string password)
    {
      var user = _users.FirstOrDefault(u => u.UserName == username);

      if (user == null || !VerifyPassword(password, user.Password))
      {
        return null;
      }

      return user;

    }

    public string HashPassword(string password)
    {

      string salt = BCrypt.Net.BCrypt.GenerateSalt();
      string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);

      return hashedPassword;
    }

    public bool VerifyPassword(string enteredPassword, string storedPassword)
    {
      return BCrypt.Net.BCrypt.Verify(enteredPassword, storedPassword);

    }








  */
}
