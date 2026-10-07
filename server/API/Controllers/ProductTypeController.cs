using Infra;
using Infra.Entities;
using Microsoft.AspNetCore.Mvc;
using Service;

namespace API.Controllers;


[ApiController]
[Route("[controller]")] 
public class ProductTypeController(ProductTypeService service) : ControllerBase
{
    [HttpGet(nameof(GetProductTypes))]
    public List<ProductType> GetProductTypes()
    {
        return service.GetProductTypes();
    }
}