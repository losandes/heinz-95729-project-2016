namespace Moviq.Interfaces.Models
{
    using System.Collections.Generic;

    public interface IMovie : IProduct
    {
        ICollection<IActor> Actors { get; set; }
        ICollection<string> TrailerLinks { get; set; }
    }
}