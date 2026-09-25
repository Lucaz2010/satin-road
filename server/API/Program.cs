var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApiDocument();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapControllers();
app.UseOpenApi();
app.UseSwaggerUi();





app.Run();
