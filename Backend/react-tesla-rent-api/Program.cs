
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using react_tesla_rent_api.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<TeslaRentApiContext>(opt =>
    opt.UseInMemoryDatabase("TeslaRent"));

builder.Services.AddCors(opt => {
    opt.AddDefaultPolicy(
        policy =>
        {
            policy.SetIsOriginAllowed(origin => new Uri(origin).IsLoopback);
            policy.AllowAnyHeader()
            .AllowAnyMethod();
        });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope()){
    var context = scope.ServiceProvider.GetRequiredService<TeslaRentApiContext>();

    try{
        DataSetup.SeedData(context).Wait();
    }
    catch(Exception ex){
        Debug.Print(ex.Message);
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
