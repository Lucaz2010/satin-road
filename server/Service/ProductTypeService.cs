using Infra;
using Infra.Entities;

namespace API.Controllers;

public class ProductTypeService (SatinRoadDbConnection db)
{
    public List<ProductType> GetProductTypes()
    {
        return db.differentProductTypes.ToList();
    }
}