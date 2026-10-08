using Microsoft.AspNetCore.Mvc;
using Service.Dtos;


namespace API.Controllers;


public partial class ProductTypeController
{
    [HttpGet(nameof(GetProductTypes))]
    public List<ProductTypeDto> GetProductTypes([FromQuery] bool isActive = true)
    {
        return service.GetProductTypes(isActive);
    }

   
}