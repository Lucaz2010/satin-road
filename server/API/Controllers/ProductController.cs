using Infra.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")] 
public class ProductController(ProductService service) : ControllerBase
{
    [HttpGet(nameof(GetProducts))]
    public List<Product> GetProducts(int page, int resultsPerPage)
    {
        return service.GetProducts(page,resultsPerPage);
    }
    
}