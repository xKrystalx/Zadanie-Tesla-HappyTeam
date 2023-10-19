using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using react_tesla_rent_api.Models;

namespace react_tesla_rent_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly TeslaRentApiContext _context;

        public CarsController(TeslaRentApiContext context)
        {
            _context = context;
        }

        // GET: api/Cars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> GetCars([FromQuery]string pickupDate = "", [FromQuery]string returnDate = "")
        {
          if (_context.Cars == null)
          {
              return NotFound();
          }

          var cars = await _context.Cars.ToListAsync();

            if(pickupDate != "" && returnDate != ""){
                DateOnly t_pickupDate = DateOnly.Parse(pickupDate);
                DateOnly t_returnDate = DateOnly.Parse(returnDate);

                //Check how many cars are available within the date range
                foreach(var car in cars){
                    var unavailableCars = await _context.Reservations.CountAsync(i => 
                                                                                car.Id == i.CarId && 
                                                                                t_pickupDate <= i.ReturnDate && 
                                                                                t_pickupDate >= i.PickupDate);
                    if(unavailableCars >= car.Available){
                        //Don't save to the database, but we can assign it here to pass onto the frontend
                        car.Available = 0;
                    }
                }
            }

            return cars;
        }

        // GET: api/Cars/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(string id)
        {
          if (_context.Cars == null)
          {
              return NotFound();
          }
            var car = await _context.Cars.FindAsync(id);

            if (car == null)
            {
                return NotFound();
            }

            return car;
        }

        private bool CarExists(string id)
        {
            return (_context.Cars?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
