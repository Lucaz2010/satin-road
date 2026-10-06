using System.ComponentModel.DataAnnotations;
using Infra.Entities;
using LinqToDB;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Dtos;

namespace API.Controllers;

public partial class ProductController
{
    [HttpPost(nameof(CreateProduct))]
    public ProductDto CreateProduct([FromBody] CreateProductRequestDto dto)
    {
        return service.CreateProduct(dto);
        
    }

    [HttpDelete("{id}")]
    public void DeleteProduct([FromRoute]string id)
    {
        service.DeleteProduct(id);
    }
    
    [HttpPatch(nameof(UpdateProduct))]
    public ProductDto UpdateProduct(
        [FromBody] UpdateProductRequestDto dto)
    {
        return service.UpdateProduct(dto);
    }
    
}