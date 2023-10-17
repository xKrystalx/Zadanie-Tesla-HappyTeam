using System.ComponentModel.DataAnnotations;

namespace react_tesla_rent_api.Models;

public class Location{
    [Key]
    [Required]
    public string Id {get;set;}

    [Required]
    public string Name {get;set;}

    public virtual ICollection<Reservation> Reservations {get;} = new List<Reservation>();

    //Position of markers not included, so that frontend side has a free hand on how to present the data. Backend serves as a way to show which locations are active.
}