using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moviq.Interfaces.Models
{
    public interface IProduct
    {
        int Id { get; set; }
        string Title { get; set; }
        string Description { get; set; }
    }

    public interface IOffering
    {
        int Id { get; set; }
        string Name { get; set; }
        decimal Price { get; set; }
    }

    public interface IProductVw 
    {
        string ThumbnailLink { get; set; }
        ICollection<string> PicLinks { get; set; }
        int Rating { get; set; }
    }
}
