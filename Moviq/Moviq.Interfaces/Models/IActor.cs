namespace Moviq.Interfaces.Models
{
    using System.Collections.Generic;

    public interface IActor
    {
        ulong Id { get; set; }
        string Name { get; set; }
        string ThumbnailLink { get; set; }

        ICollection<IMovie> Movies { get; set; }
        ICollection<string> PicLinks { get; set; }
    }
}