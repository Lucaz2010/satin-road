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
    
    public string Price { get; set; }
    public string Inventory { get; set; }
    public bool IsActive { get; set; }
    public string CreatedAt { get; set; }
    public string ProductTypeId { get; set; }
    [Association(ThisKey = nameof(ProductTypeId), OtherKey = nameof(ProductType.ProductTypeId))]
    public ProductType ProductType { get; set; }
}

public class ProductDto
{
    public string ProductId { get; set; }
    public string ProductName { get; set; }
    public string? Description { get; set; }
    public string VendorId { get; set; }
    
    public string Price { get; set; }
    public string Inventory { get; set; }
    public bool IsActive { get; set; }
    public string CreatedAt { get; set; }
    public string ProductTypeId { get; set; }
    
    public UserDto Vendor { get; set; }
}

public class UserDto
{
    public string UserId { get; set; }
    public string Username { get; set; }
    
}