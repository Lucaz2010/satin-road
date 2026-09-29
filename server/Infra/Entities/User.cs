namespace Infra.Entities;

public class User
{
    public string UserId { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string Salt { get; set; }
    public string Role { get; set; }
    public bool IsActive { get; set; }
    public string CreatedAt { get; set; }
}