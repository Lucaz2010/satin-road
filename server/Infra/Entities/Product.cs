using LinqToDB.Mapping;

namespace Infra.Entities;

public class Product
{
    [PrimaryKey]
    public string ProductId { get; set; }
    public string ProductName { get; set; }
    public string? Description { get; set; }
    public string VendorId { get; set; }
    [Association(ThisKey = nameof(VendorId), OtherKey = nameof(User.UserId))]
    public User Vendor { get; set; }
    
    public decimal Price { get; set; }
    public int Inventory { get; set; }
    
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public string ProductTypeId { get; set; }
    [Association(ThisKey = nameof(ProductTypeId), OtherKey = nameof(ProductType.ProductTypeId))]
    public ProductType ProductType { get; set; }
}   