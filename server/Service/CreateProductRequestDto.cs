using System.ComponentModel.DataAnnotations;

namespace API.Controllers;

public class CreateProductRequestDto
{
    [Required]
    public string ProductName { get; set; }
    [Required,Range(0.01, double.MaxValue)]
    public decimal Price { get; set; }
    
    [Range(1, int.MaxValue)]
    public int Inventory { get; set; }
    public string? Description { get; set; }
    [Required]
    public string ProductTypeId { get; set; }
    [Required]
    public string VendorId { get; set; }
}