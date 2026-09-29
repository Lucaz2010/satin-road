using API.Controllers;
using Infra;
using Infra.Entities;
using LinqToDB;

var builder = WebApplication.CreateBuilder(args);

var options = new DataOptions<SatinRoadDbConnection>(
    new DataOptions().UseSQLite("Data Source = db.b"));
builder.Services.AddScoped<SatinRoadDbConnection>(_ =>
    new SatinRoadDbConnection(options));

builder.Services.AddScoped<ProductTypeService>();
builder.Services.AddScoped<UserService>();
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
    if (db.differentProductTypes.Count() == 0)
    {
        db.Insert(new ProductType()
        {
            ProductTypeId = "1",
            ProductTypeName = "Drugs"

        });
    }
    
    db.CreateTable<User>(tableOptions:TableOptions.CreateIfNotExists);
    if (db.Users.Count() == 0)
    {
        db.Insert(new User
        {
            UserId = "1",
            Username = "Conan"
        });
    }
    
    
    
}   

app.UseExceptionHandler();
app.UseCors(config => config.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().SetIsOriginAllowed(_=>true));
app.MapControllers();
app.UseOpenApi();
app.UseSwaggerUi();





app.Run();