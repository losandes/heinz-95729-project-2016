namespace Moviq.Interfaces.Models
{
    using System.Collections.Generic;

    public interface IMovie
    {
        ulong Id { get; set; }
        string Title { get; set; }
        string Description { get; set; }
        string ThumbnailLink { get; set;}

        ICollection<IActor> Actors { get; set; }
        ICollection<string> PicLinks { get; set; }
        ICollection<string> TrailerLinks { get; set; }
    }
}