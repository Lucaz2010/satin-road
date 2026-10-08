using Infra;
using Infra.Entities;
using Service.Dtos;

namespace Service;

public class UserService (SatinRoadDbConnection db)
{
    public List<User> GetUsers()
    {
        return db.Users.ToList();
    }
    
    public LoginResponseDto Login(LoginRequestDto dto)
    {
        var user = db.Users
            .FirstOrDefault(u =>
                u.Username == dto.Username &&
                u.IsActive);

        if (user == null)
            throw new UnauthorizedAccessException("Invalid username or password.");

        // Temporary login for development.
        if (user.Username == "admin_1" && dto.Password == "admin")
        {
            return new LoginResponseDto
            {
                UserId = user.UserId,
                Username = user.Username,
                Role = user.Role
            };
        }
        
        if ((user.Username == "lucaz" || user.Username == "Conan")
            && dto.Password == "user")
        {
            return new LoginResponseDto
            {
                UserId = user.UserId,
                Username = user.Username,
                Role = user.Role
            };
        }

        throw new UnauthorizedAccessException("Invalid username or password.");
    }
    
}


