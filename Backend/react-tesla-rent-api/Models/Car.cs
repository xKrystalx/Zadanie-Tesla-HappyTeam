using System.ComponentModel.DataAnnotations;

namespace react_tesla_rent_api.Models;

public class Car{
    [Key]
    [Required]
    public string Id {get;set;}

    [Required]
    public string Name {get;set;}

    [Required]
    [Range(0, Int32.MaxValue)]
    public int Range {get;set;}

    [Required]
    [DataType(DataType.Currency)]
    public decimal Price {get; set;}

    [Required]
    [Range(0, Int32.MaxValue)]
    public int Available {get;set;}

    public ICollection<Reservation> Reservations {get;} = new List<Reservation>();
}