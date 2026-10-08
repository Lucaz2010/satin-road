using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Dtos;


namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public partial class ProductTypeController (ProductTypeService service) : ControllerBase
{
    [HttpPost(nameof(CreateProductType))]
    public ProductTypeDto CreateProductType(
        [FromQuery] string name,
        [FromQuery] string? description)
    {
        return service.CreateProductType(name, description);
    }
    
    [HttpPatch(nameof(UpdateProductType))]
    public ProductTypeDto UpdateProductType(
        [FromQuery] string id,
        [FromQuery] string name,
        [FromQuery] string? description)
    {
        return service.UpdateProductType(id, name, description);
    }
    
    [HttpDelete(nameof(DeactivateProductType))]
    public void DeactivateProductType([FromQuery] string id)
    {
        service.DeactivateProductType(id);
    }
    
    [HttpPatch(nameof(ActivateProductType))]
    public void ActivateProductType([FromQuery] string id)
    {
        service.ActivateProductType(id);
    }
    
}