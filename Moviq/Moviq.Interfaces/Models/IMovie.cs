namespace Moviq.Interfaces.Models
{
    using System.Collections.Generic;

    public interface IMovie : IProduct, IProductVw
    {
        ICollection<IActor> Actors { get; set; }
        ICollection<string> TrailerLinks { get; set; }
    }

    public interface IMovieProduct : IMovie
    {
        ICollection<IOffering> Offerings { get; set; }
    }
}