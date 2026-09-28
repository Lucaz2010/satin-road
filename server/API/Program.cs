using API.Controllers;
using Infra;
using LinqToDB;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

var options = new DataOptions<SatinRoadDbConnection>(
    new DataOptions().UseSQLite("Data Source = db.b"));
builder.Services.AddScoped<SatinRoadDbConnection>(_ =>
    new SatinRoadDbConnection(options));

builder.Services.AddScoped<ProductTypeService>();
builder.Services.AddControllers();
builder.Services.AddOpenApiDocument();
builder.Services.AddCors();

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
}   


app.UseCors(config => config.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().SetIsOriginAllowed(_=>true));
app.MapControllers();
app.UseOpenApi();
app.UseSwaggerUi();





app.Run();
