using Microsoft.EntityFrameworkCore;
using NeatAPI.Data;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DataContextConnection") ?? throw new InvalidOperationException("Connection string: 'DataContextConnection' Not Found!");

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(options =>

options.UseSqlServer(connectionString));

builder.Services.AddCors(options => options.AddPolicy(name: "NeatPolicy",
  policy =>
  {
    policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
  }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("NeatPolicy");

app.UseHttpsRedirection();


app.UseAuthorization();

app.MapControllers();

app.Run();
