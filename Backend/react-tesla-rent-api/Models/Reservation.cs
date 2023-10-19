using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace react_tesla_rent_api.Models;

public class ReservationDTO{
    [Key]
    public int Id {get;set;}

    [Required]
    public string FirstName {get;set;}

    [Required]
    public string LastName {get;set;}

    [Required]
    [DataType(DataType.EmailAddress)]
    [RegularExpression("^[A-Za-z0-9+_.-]+@(.+)$")]
    public string Email {get;set;}

    [Required]
    [DataType(DataType.PhoneNumber)]
    public string PhoneNumber {get;set;}

    [Required]
    [DataType(DataType.Date)]
    public DateOnly PickupDate {get;set;}

    [Required]
    [DataType(DataType.Date)]
    public DateOnly ReturnDate {get;set;}

    [DataType(DataType.Currency)]
    public decimal Total {get;set;}

    [Required]
    public string CarId {get;set;}

    [Required]
    public string LocationId {get;set;}
}

public class Reservation{

    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id {get;set;}

    [Required]
    public string FirstName {get;set;}

    [Required]
    public string LastName {get;set;}

    [Required]
    [DataType(DataType.EmailAddress)]
    [RegularExpression("^[A-Za-z0-9+_.-]+@(.+)$")]
    public string Email {get;set;}

    [Required]
    [DataType(DataType.PhoneNumber)]
    public string PhoneNumber {get;set;}

    [Required]
    [DataType(DataType.Date)]
    public DateOnly PickupDate {get;set;}

    [Required]
    [DataType(DataType.Date)]
    public DateOnly ReturnDate {get;set;}

    [Required]
    [DataType(DataType.Currency)]
    public decimal Total {get;set;}

    [Required]
    [ForeignKey("Car")]
    public string CarId {get;set;}

    public virtual Car Car {get;set;}

    [Required]
    [ForeignKey("Location")]
    public string LocationId {get;set;}

    public virtual Location Location {get;set;}

}