using Infra;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProductTypeController(ProductTypeService service) : ControllerBase
{
    [HttpGet(nameof(GetProductTypes))]
    public List<ProductType> GetProductTypes()
    {
        return service.GetProductTypes();
    }
}