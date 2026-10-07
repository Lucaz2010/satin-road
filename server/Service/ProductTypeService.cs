using Infra;
using Infra.Entities;

namespace Service;

public class ProductTypeService (SatinRoadDbConnection db)
{
    public List<ProductType> GetProductTypes()
    {
        return db.differentProductTypes.ToList();
    }
}