using Facet;
using Infra.Entities;

namespace API.Controllers;


[Facet(sourceType:typeof(User),
    
    exclude: new[]
    {
    nameof(User.ProductsBeingSoldByVendor), 
    nameof(User.PasswordHash),
    nameof(User.Salt),
    nameof(User.Email),
    nameof(User.Role),
    nameof(User.IsActive),
    nameof(User.CreatedAt)
    }
    )]

public partial class VendorDto;

[Facet(sourceType: typeof(Product),exclude:nameof(Product.Vendor))]
public partial class ProductDto
{
    public VendorDto Vendor { get; set; }
    
}

