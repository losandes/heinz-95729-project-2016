namespace Moviq.Interfaces.Models
{
    using System.Collections.Generic;

    public interface IAuthor
    {
        int Id { get; set; }
        string Name { get; set; }
        string ThumbnailLink { get; set; }

        ICollection<IBook> Books { get; set; }
        ICollection<string> PicLinks { get; set; }
    }
}