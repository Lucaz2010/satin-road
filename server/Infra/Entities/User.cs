using LinqToDB.Mapping;

namespace Infra.Entities;

public class User
{
    [PrimaryKey]
    public string UserId { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string Salt { get; set; }
    public string Role { get; set; }
    public bool IsActive { get; set; }
    public string CreatedAt { get; set; }
    
    [Association(ThisKey = nameof(UserId), OtherKey = nameof(Product.VendorId))]
    public List<Product> ProductsBeingSoldByVendor { get; set; } = [];
}