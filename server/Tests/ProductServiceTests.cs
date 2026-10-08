using System.ComponentModel.DataAnnotations;
using Infra;
using Infra.Entities;
using LinqToDB;
using Service;
using Service.Dtos;

namespace Tests;

public class ProductServiceTests : IDisposable
{
    private readonly SatinRoadDbConnection _db;
    private readonly ProductService _service;

    public ProductServiceTests()
    {
        // In-memory SQLite lives as long as the connection, so every test gets a fresh database.
        var options = new DataOptions<SatinRoadDbConnection>(
            new DataOptions().UseSQLite("Data Source=:memory:"));
        _db = new SatinRoadDbConnection(options);

        _db.CreateTable<ProductType>();
        _db.CreateTable<User>();
        _db.CreateTable<Product>();

        _db.Insert(new ProductType { ProductTypeId = "1", ProductTypeName = "Drugs", IsActive = true });
        _db.Insert(new User
        {
            UserId = "vendor-1",
            Username = "Conan",
            Email = "conan@example.com",
            PasswordHash = "hash",
            Salt = "salt",
            Role = "User",
            IsActive = true,
            CreatedAt = DateTime.UtcNow.ToString("O")
        });

        _service = new ProductService(_db);
    }

    public void Dispose() => _db.Dispose();

    private void SeedProducts(int count)
    {
        for (var i = 1; i <= count; i++)
        {
            _db.Insert(new Product
            {
                ProductId = i.ToString(),
                ProductName = $"Product {i}",
                VendorId = "vendor-1",
                ProductTypeId = "1",
                Price = 10,
                Inventory = 1,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            });
        }
    }

    private static CreateProductRequestDto ValidRequest() => new()
    {
        ProductName = "AK-48",
        Description = "Barely used",
        Price = 120,
        Inventory = 3,
        ProductTypeId = "1",
        VendorId = "vendor-1"
    };

    // GetProducts

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    public void GetProducts_PageBelowOne_Throws(int page)
    {
        Assert.Throws<ValidationException>(() => _service.GetProducts(page, 10, null, null));
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    public void GetProducts_ResultsPerPageBelowOne_Throws(int resultsPerPage)
    {
        Assert.Throws<ValidationException>(() => _service.GetProducts(1, resultsPerPage, null, null));
    }

    [Fact]
    public void GetProducts_ReturnsRequestedPageSize()
    {
        SeedProducts(5);

        var result = _service.GetProducts(page: 1, resultsPerPage: 2, productTypeId: null, search: null);

        Assert.Equal(2, result.Count);
    }

    [Fact]
    public void GetProducts_LastPage_ReturnsRemainingProducts()
    {
        SeedProducts(5);

        var result = _service.GetProducts(page: 3, resultsPerPage: 2, productTypeId: null, search: null);

        Assert.Single(result);
    }

    [Fact]
    public void GetProducts_PageBeyondEnd_ReturnsEmpty()
    {
        SeedProducts(5);

        var result = _service.GetProducts(page: 10, resultsPerPage: 2, productTypeId: null, search: null);

        Assert.Empty(result);
    }

    [Fact]
    public void GetProducts_IncludesVendor()
    {
        SeedProducts(1);

        var product = Assert.Single(_service.GetProducts(1, 10, null, null));

        Assert.Equal("vendor-1", product.Vendor.UserId);
        Assert.Equal("Conan", product.Vendor.Username);
    }

    // CreateProduct

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    [InlineData(null)]
    public void CreateProduct_MissingName_Throws(string? name)
    {
        var request = ValidRequest();
        request.ProductName = name!;

        Assert.Throws<ValidationException>(() => _service.CreateProduct(request));
        Assert.Empty(_db.Products);
    }

    [Theory]
    [InlineData("")]
    [InlineData(null)]
    public void CreateProduct_MissingProductType_Throws(string? productTypeId)
    {
        var request = ValidRequest();
        request.ProductTypeId = productTypeId!;

        Assert.Throws<ValidationException>(() => _service.CreateProduct(request));
        Assert.Empty(_db.Products);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-5)]
    public void CreateProduct_PriceNotPositive_Throws(decimal price)
    {
        var request = ValidRequest();
        request.Price = price;

        Assert.Throws<ValidationException>(() => _service.CreateProduct(request));
        Assert.Empty(_db.Products);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    public void CreateProduct_InventoryBelowOne_Throws(int inventory)
    {
        var request = ValidRequest();
        request.Inventory = inventory;

        Assert.Throws<ValidationException>(() => _service.CreateProduct(request));
        Assert.Empty(_db.Products);
    }

    [Fact]
    public void CreateProduct_ValidRequest_PersistsActiveProduct()
    {
        var result = _service.CreateProduct(ValidRequest());

        var stored = Assert.Single(_db.Products);
        Assert.Equal(result.ProductId, stored.ProductId);
        Assert.Equal("AK-48", stored.ProductName);
        Assert.Equal("Barely used", stored.Description);
        Assert.Equal(120, stored.Price);
        Assert.Equal(3, stored.Inventory);
        Assert.Equal("1", stored.ProductTypeId);
        Assert.Equal("vendor-1", stored.VendorId);
        Assert.True(stored.IsActive);
    }

    [Fact]
    public void CreateProduct_GeneratesUniqueIds()
    {
        var first = _service.CreateProduct(ValidRequest());
        var second = _service.CreateProduct(ValidRequest());

        Assert.NotEqual(first.ProductId, second.ProductId);
    }
}
