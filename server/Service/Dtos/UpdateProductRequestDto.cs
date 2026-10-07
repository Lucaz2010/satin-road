namespace Service.Dtos;

public class UpdateProductRequestDto
{
    public string ProductId { get; set; }

    public string ProductName { get; set; }

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public int Inventory { get; set; }

    public string ProductTypeId { get; set; }
}