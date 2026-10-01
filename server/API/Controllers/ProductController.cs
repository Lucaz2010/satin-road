using Infra.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")] 
public class ProductController(ProductService service) : ControllerBase
{
    [HttpGet(nameof(GetProducts))]
    public List<ProductDto> GetProducts(int page, int resultsPerPage)
    {
        return service.GetProducts(page,resultsPerPage);
    }

    [HttpPost(nameof(CreateProduct))]
    public ProductDto CreateProduct(CreateProductRequestDto dto)
    {
       return service.CreateProduct(dto);
       
    }
}