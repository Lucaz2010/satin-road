using System.ComponentModel.DataAnnotations;

namespace API.Controllers;

public class CreateProductRequestDto
{
   
    public string ProductName { get; set; }
    [Required]
    public decimal Price { get; set; }
    
    public int Inventory { get; set; }
    public string? Description { get; set; }
   
    public string ProductTypeId { get; set; }
    [Required]
    public string VendorId { get; set; }
}