using Infra;
using Infra.Entities;
using Microsoft.AspNetCore.Mvc;

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
}

