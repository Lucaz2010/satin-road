using System.ComponentModel.DataAnnotations;
using Infra;
using Infra.Entities;
using LinqToDB;
using Service.Dtos;

namespace Service;

public class ProductTypeService (SatinRoadDbConnection db)
{
    public List<ProductTypeDto> GetProductTypes(bool isActive = true)
    {
        var query = db.differentProductTypes.AsQueryable();
        
        if (isActive)
            query = query.Where(pt => pt.IsActive);
        
        return query
            .OrderBy(pt => pt.ProductTypeName)
            .Select(pt => new ProductTypeDto(pt))
            .ToList();
    }
    
    
    public ProductTypeDto CreateProductType(string name, string? description)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ValidationException("Category name is required.");

        var productType = new ProductType
        {
            ProductTypeId = Guid.NewGuid().ToString(),
            ProductTypeName = name,
            Description = description,
            IsActive = true
        };

        db.Insert(productType);

        return new ProductTypeDto(productType);
    }
    
    public ProductTypeDto UpdateProductType(
        string id,
        string name,
        string? description)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ValidationException("Category name is required.");

        var productType = db.differentProductTypes
                              .FirstOrDefault(pt => pt.ProductTypeId == id)
                          ?? throw new KeyNotFoundException(
                              $"Product type with id '{id}' was not found.");

        productType.ProductTypeName = name;
        productType.Description = description;

        db.Update(productType);

        return new ProductTypeDto(productType);
    }
    
    public void DeactivateProductType(string id)
    {
        var productType = db.differentProductTypes
                              .FirstOrDefault(pt => pt.ProductTypeId == id)
                          ?? throw new KeyNotFoundException(
                              $"Product type with id '{id}' was not found.");

        productType.IsActive = false;

        db.Update(productType);
    }
    
    public void ActivateProductType(string id)
    {
        var productType = db.differentProductTypes
                              .FirstOrDefault(pt => pt.ProductTypeId == id)
                          ?? throw new KeyNotFoundException(
                              $"Product type with id '{id}' was not found.");

        productType.IsActive = true;

        db.Update(productType);
    }
    
    
}

