using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using NeatAPI.Data;
using NeatAPI.Interfaces;
using NeatAPI.Repositories;
using Swashbuckle.AspNetCore.Filters;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DataContextConnection") ?? throw new InvalidOperationException("Connection string: 'DataContextConnection' Not Found!");

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<INeatBookingRepository, NeatBookingRepository>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
  options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
  {
    Description = "Standard Authorization Header Using The Bearer Scheme (\"bearer {token}\")",
    In = ParameterLocation.Header,
    Name = "Authorization",
    Type = SecuritySchemeType.ApiKey

  });

  options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddDbContext<DataContext>(options =>

options.UseSqlServer(connectionString));

builder.Services.AddCors(options => options.AddPolicy(name: "NeatPolicy",
  policy =>
  {
    policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
  }));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer(options =>
  {
    options.TokenValidationParameters = new TokenValidationParameters
    {
      ValidateIssuerSigningKey = true,
      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.
        GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
      ValidateIssuer = false,
      ValidateAudience = false
    };
  });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("NeatPolicy");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
