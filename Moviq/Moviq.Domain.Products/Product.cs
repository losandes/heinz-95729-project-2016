using Moviq.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moviq.Domain.Products
{
    public class Product : IProductVw
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string MetaData { get; set; }
        public string ThumbnailLink { get; set; }
        public ICollection<string> PicLinks { get; set; }
        public int Rating { get; set; }
    }
}
