using API;
using API.Controllers;
using Infra;
using Infra.Entities;
using LinqToDB;
using Service;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
                       ?? throw new InvalidOperationException("Database connection string is missing.");


var options = new DataOptions<SatinRoadDbConnection>(
    new DataOptions().UsePostgreSQL(connectionString));
builder.Services.AddScoped<SatinRoadDbConnection>(_ =>
    new SatinRoadDbConnection(options));

builder.Services.AddScoped<ProductTypeService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddControllers();
builder.Services.AddOpenApiDocument();
builder.Services.AddCors();
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<MyExceptionHandler>();



var app = builder.Build();


using (var scope = app.Services.CreateScope())
{
   var db = scope.ServiceProvider.GetRequiredService<SatinRoadDbConnection>();
   
    db.CreateTable<ProductType>(tableOptions:TableOptions.CreateIfNotExists);
    db.CreateTable<User>(tableOptions:TableOptions.CreateIfNotExists);
    db.CreateTable<Product>(tableOptions:TableOptions.CreateIfNotExists);
    
    if (db.differentProductTypes.Count() == 0)
    {
        db.Insert(new ProductType()
        {
            ProductTypeId = "1",
            ProductTypeName = "Drugs"
        });
            db.Insert(new ProductType
            {
            ProductTypeId = "2",
            ProductTypeName = "Weaponry"
        });

        db.Insert(new ProductType
        {
            ProductTypeId = "3",
            ProductTypeName = "Stolen Artifacts"
            
        });
        
    }
    
    if (db.Users.Count() == 0)
    {
        db.Insert(new User
        {
            UserId = "1",
            Username = "Conan"
        });
    }
    if (db.Products.Count() == 0)
    {
        db.Insert(new Product
        {
          ProductId = "1",
          ProductTypeId = "2",
          ProductName = "AK-48",
          VendorId = "1",
          Price = 120,
          Inventory = 1,
          IsActive = true,
          CreatedAt = DateTime.Now,
        });
    }
    
    
    
}   

app.UseExceptionHandler();
app.UseCors(config => config.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().SetIsOriginAllowed(_=>true));
app.MapControllers();
app.UseOpenApi();
app.UseSwaggerUi();





app.Run();