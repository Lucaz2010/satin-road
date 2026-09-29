using Infra.Entities;
using LinqToDB;
using LinqToDB.Data;

namespace Infra;

public class SatinRoadDbConnection : DataConnection
{
    public SatinRoadDbConnection(DataOptions<SatinRoadDbConnection> options) : base(options.Options)
    {
        
    }

    public ITable<ProductType> differentProductTypes => this.GetTable<ProductType>();
    public ITable<User> Users => this.GetTable<User>();
}