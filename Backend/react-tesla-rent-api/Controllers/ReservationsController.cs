using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using react_tesla_rent_api.Models;

namespace react_tesla_rent_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly TeslaRentApiContext _context;

        public ReservationsController(TeslaRentApiContext context)
        {
            _context = context;
        }

        //Available only for development and testing purposes, since it's a recruitment task
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReservationDTO>>> GetReservations()
        {
          if (_context.Reservations == null)
          {
              return NotFound();
          }
            return await _context.Reservations.Select(i => ItemToDTO(i)).ToListAsync();
        }

        // POST: api/Reservations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ReservationDTO>> PostReservation(ReservationDTO reservationDTO)
        {
          if (_context.Reservations == null)
          {
              return Problem("Entity set 'TeslaRentApiContext.Reservations'  is null.");
          }

            if(ReservationExists(reservationDTO.Id)){
                return Problem("Reservation exists.");
            }

            var reservation = new Reservation(){
                FirstName = reservationDTO.FirstName,
                LastName = reservationDTO.LastName,
                Email = reservationDTO.Email,
                PhoneNumber = reservationDTO.PhoneNumber,
                PickupDate = reservationDTO.PickupDate,
                ReturnDate = reservationDTO.ReturnDate,
                Total = reservationDTO.Total,
                CarId = reservationDTO.CarId,
                LocationId = reservationDTO.LocationId
            };

            var car = await _context.Cars.FindAsync(reservationDTO.CarId);
            if(car == null){
                return Problem("Selected model does not exist.");
            }

            var location = await _context.Locations.FindAsync(reservationDTO.LocationId);
            if(location == null){
                return Problem("Selected location does not exist.");
            }

            reservation.Car = car;
            reservation.Location = location;

            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            return Ok(ItemToDTO(reservation));
        }

        private bool ReservationExists(int id)
        {
            return (_context.Reservations?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private ReservationDTO ItemToDTO(Reservation reservation){
            return new ReservationDTO(){
                Id = reservation.Id,
                FirstName = reservation.FirstName,
                LastName = reservation.LastName,
                Email = reservation.Email,
                PhoneNumber = reservation.PhoneNumber,
                PickupDate = reservation.PickupDate,
                ReturnDate = reservation.ReturnDate,
                Total = reservation.Total,
                CarId = reservation.CarId,
                LocationId = reservation.LocationId,
            };
        }
    }
}
