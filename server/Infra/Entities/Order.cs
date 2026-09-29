namespace Infra.Entities;

public class Order
{
    public string OrderId { get; set; }
    public string BuyerId { get; set; }
    public string VendorId { get; set; }
    public int TotalAmount { get; set; }
    public string DiscountAmount { get; set; }
    public string CreatedAt { get; set; }
    public string Status { get; set; }
}