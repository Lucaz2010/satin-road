using System.ComponentModel.DataAnnotations;
using Infra;
using Infra.Entities;
using LinqToDB;
using Service.Dtos;

namespace Service;

public class ProductService (SatinRoadDbConnection db)
{
    public List<ProductDto> GetProducts(int page, int resultsPerPage)
    {
        if(page < 1)
            throw new ValidationException("Page must be 1 or higher.");
        if(resultsPerPage < 1)
            throw new ValidationException("Must have at least one result per page.");
        return db.Products
            .LoadWith(p => p.Vendor)
            .Skip((page-1) * resultsPerPage)
            .Take(resultsPerPage)
            .Select(p=> new ProductDto(p)
                {
                    Vendor = new VendorDto(p.Vendor)
                }
                )
            .ToList();
    }
    
    public ProductDto GetSingleProduct(string id)
    {
        var product = db.Products
            .LoadWith(p => p.Vendor)
            .LoadWith(p=> p.ProductType)
            .FirstOrDefault(p => p.ProductId == id);

        if (product == null)
            throw new KeyNotFoundException(
                $"Product with id '{id}' was not found.");

        return new ProductDto(product)
        {
            Vendor = new VendorDto(product.Vendor)
        };
    }

    public ProductDto CreateProduct(CreateProductRequestDto dto)
    {
        
        if (string.IsNullOrWhiteSpace(dto.ProductName))
        {
            throw new ValidationException("Product name is required.");
        }

        if (string.IsNullOrWhiteSpace(dto.ProductTypeId))
        {
            throw new ValidationException("Product Category is required.");
        }
        
        if (dto.Price <= 0)
        {
            throw new ValidationException("Price must be higher than zero.");
        }
        
        if (dto.Inventory < 1)
        {
            throw new ValidationException("Inventory must be 1 or higher.");
        }
        
        
        var p = (new Product()
            {
                ProductId = Guid.NewGuid().ToString(),
                
                ProductName = dto.ProductName,
                Description = dto.Description,
                Inventory =  dto.Inventory,
                Price = dto.Price,
                ProductTypeId = dto.ProductTypeId, 
                
                // after authentication implementation this should be 
                // VendorId = currentUserId
                VendorId = dto.VendorId,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
                
            }
        );
        db.Insert(p);
        
        return new ProductDto(p);
    }

    public void DeleteProduct(string id)
    {
        var p = db.Products
            .FirstOrDefault(p=>p.ProductId == id)
                ?? throw new KeyNotFoundException(
                    $"Product with id '{id}' was not found.");
        db.Delete(p);
    }
}