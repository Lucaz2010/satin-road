
using Microsoft.AspNetCore.Mvc;
using Service;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public partial class ProductController(ProductService service) : ControllerBase
{ 
    [HttpGet(nameof(GetProducts))]
    public List<ProductDto> GetProducts(
        [FromQuery] int page,
        [FromQuery] int resultsPerPage,
        [FromQuery] List<string>? productTypeId,
        [FromQuery] string? search,
        [FromQuery] string? vendorId)
    {
        return service.GetProducts(
            page,
            resultsPerPage,
            productTypeId,
            search,
            vendorId
        );
    }

    [HttpGet("{id}")]
    public ProductDto GetProduct([FromRoute]string id)
    {
        return service.GetSingleProduct(id);
    }
    
    
}


 