using Microsoft.AspNetCore.Mvc;
using Service;


namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public partial class ProductTypeController (ProductTypeService service) : ControllerBase
{
   
}