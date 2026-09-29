namespace Infra.Entities;

public class Product
{
    public string ProductId { get; set; }
    public string ProductName { get; set; }
    public string? Description { get; set; }
    public string ProductTypeId { get; set; }
    public string VendorId { get; set; }
    public string Price { get; set; }
    public string Inventory { get; set; }
    public bool IsActive { get; set; }
    public string CreatedAt { get; set; }
}