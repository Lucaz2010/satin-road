using LinqToDB;
using LinqToDB.Data;

namespace Infra;

public class SatinRoadDbConnection : DataConnection
{
    public SatinRoadDbConnection(DataOptions<SatinRoadDbConnection> options) : base(options.Options)
    {
    }

    public ITable<ProductType> ProductTypeTable => this.GetTable<ProductType>();
}