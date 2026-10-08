using Infra;
using Infra.Entities;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Dtos;

namespace API.Controllers;


[ApiController]
[Route("[controller]")]

public class UserController(UserService service) : ControllerBase
{
    [HttpGet(nameof(GetUsers))]
    public List<User> GetUsers()
    {
        return service.GetUsers();
    }
    
    [HttpPost(nameof(Login))]
    public LoginResponseDto Login(LoginRequestDto dto)
    {
        return service.Login(dto);
    }
}

