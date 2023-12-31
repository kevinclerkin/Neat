using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using NeatAPI.Data;
using NeatAPI.Interfaces;
using NeatAPI.Models;
using NeatAPI.Repositories;
using Swashbuckle.AspNetCore.Filters;
using System.Text;
using SendGrid.Extensions.DependencyInjection;
using NeatAPI.Services;
using NeatAPI.Utils;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("AzureDataContextConnection") ?? throw new InvalidOperationException("Connection string: 'DataContextConnection' Not Found!");

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<INeatBookingRepository, NeatBookingRepository>();
builder.Services.AddScoped<INeatServiceRepository, NeatServiceRepository>();
builder.Services.AddScoped<IAvailabilityRepository, AvailabilityRepository>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddSendGrid(options =>
{
    options.ApiKey = builder.Configuration
    .GetSection("EmailSettings").GetValue<string>("ApiKey");
});



// Configure SQL Azure execution strategy
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(connectionString, sqlServerOptions =>
    {
        sqlServerOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(30),
            errorNumbersToAdd: null);
    });
});



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

//builder.Services.AddDbContext<DataContext>(options =>

//options.UseSqlServer(connectionString));


/*builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
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
  });*/


builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("veryverysceret.....")),
        ValidateAudience = false,
        ValidateIssuer = false,
        ClockSkew = TimeSpan.Zero
    };
});



builder.Services.AddCors(options => options.AddPolicy(name: "NeatPolicy",
  policy =>
  {
      policy.WithOrigins("http://localhost:4200")
      .AllowAnyMethod()
      .AllowAnyHeader()
      .AllowCredentials();
  }));

var app = builder.Build();

// Configure the HTTP request pipeline.

//Removed developement conditional for Swagger

app.UseSwagger();
app.UseSwaggerUI(a =>
{
    a.SwaggerEndpoint("/swagger/v1/swagger.json", "Neat API V1");

});


app.UseHttpsRedirection();

app.UseCors("NeatPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

