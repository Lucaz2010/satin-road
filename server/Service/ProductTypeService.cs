using Infra;
using Infra.Entities;
using Service.Dtos;

namespace Service;

public class ProductTypeService (SatinRoadDbConnection db)
{
    public List<ProductTypeDto> GetProductTypes()
    {
        return db.differentProductTypes
            .Select(pt => new ProductTypeDto(pt))
            .ToList();
    }
}