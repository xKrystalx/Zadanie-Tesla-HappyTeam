using Microsoft.EntityFrameworkCore;

namespace react_tesla_rent_api.Models;

public class TeslaRentApiContext: DbContext{
    public TeslaRentApiContext(DbContextOptions<TeslaRentApiContext> options) : base(options){
    }

    public DbSet<Location> Locations {get;set;} = null!;
    public DbSet<Car> Cars {get;set;} = null!;
    public DbSet<Reservation> Reservations {get;set;} = null!;

    //Setup relationships
    protected override void OnModelCreating(ModelBuilder modelBuilder){
        
    }
}