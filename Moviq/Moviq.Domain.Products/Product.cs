using Moviq.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moviq.Domain.Products
{
    public class Product : IProduct, IHelpCategorizeNoSqlData
    {
        public Product() 
        {
            this._type = "product";
        }

        public string Uid { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Metadata { get; set; }
        public decimal Price { get; set; }
        public string ThumbnailLink { get; set; }
        public IEnumerable<string> Tags { get; set; }
        public string _type { get; set; }
    }
}
