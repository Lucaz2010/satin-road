using Microsoft.AspNetCore.Mvc;
using Service.Dtos;


namespace API.Controllers;


public partial class ProductTypeController
{
    [HttpGet(nameof(GetProductTypes))]
    public List<ProductTypeDto> GetProductTypes()
    {
        return service.GetProductTypes();
    }

   
}