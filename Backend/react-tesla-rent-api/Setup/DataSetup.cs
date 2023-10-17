using Newtonsoft.Json;
using react_tesla_rent_api.Controllers;
using react_tesla_rent_api.Models;

public class DataSetup{
    public static async Task SeedData(TeslaRentApiContext context){
        if(!context.Cars.Any()){
            string carsJson = System.IO.File.ReadAllText("Setup" + Path.DirectorySeparatorChar + "cars.json");
            List<Car> carList = JsonConvert.DeserializeObject<List<Car>>(carsJson);
            await context.Cars.AddRangeAsync(carList);
            await context.SaveChangesAsync();
        }
        if(!context.Locations.Any()){
            string locationsJson = System.IO.File.ReadAllText("Setup" + Path.DirectorySeparatorChar + "locations.json");
            List<Location> locationList = JsonConvert.DeserializeObject<List<Location>>(locationsJson);
            await context.Locations.AddRangeAsync(locationList);
            await context.SaveChangesAsync();
        }
    }
}