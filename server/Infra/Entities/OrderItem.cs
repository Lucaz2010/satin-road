namespace Infra.Entities;

public class OrderItem
{
    public string OrderItemId { get; set; }
    public string OrderId { get; set; }
    public string ProductId { get; set; }
    public string Quantity { get; set; }
    public string Price { get; set; }
}