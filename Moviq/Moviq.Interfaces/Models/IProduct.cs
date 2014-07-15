namespace Moviq.Interfaces.Models
{
    using System.Collections.Generic;

    public interface IProduct
    {
        int Id { get; set; }
        string Title { get; set; }
        string Description { get; set; }
        string MetaData { get; set; }
    }

    public interface IOffering
    {
        int Id { get; set; }
        string Name { get; set; }
        decimal Price { get; set; }
    }

    public interface IProductVw : IProduct
    {
        string ThumbnailLink { get; set; }
        ICollection<string> PicLinks { get; set; }
        int Rating { get; set; }
    }
}
