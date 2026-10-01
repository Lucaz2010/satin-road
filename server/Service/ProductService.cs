using System.ComponentModel.DataAnnotations;
using Infra;
using Infra.Entities;
using LinqToDB;

namespace API.Controllers;

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
            .Take(resultsPerPage)
            .Skip((page-1) * resultsPerPage)
            .Select(p=> new ProductDto(p)
                {
                    Vendor = new VendorDto(p.Vendor)
                }
                )
            .ToList();
    }
}