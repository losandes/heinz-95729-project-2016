using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moviq.Interfaces.Models;

namespace Moviq.Domain.Cart
{
    public class Cart : ICart, IHelpCategorizeNoSqlData
    {
        public int count { get; set; }

        public Cart()
        {
            this._type = "cart";
            this.count = 0;
            this.guid = Guid.Empty ;
        }

        public Guid guid { get; set; }
        public ICollection<IProduct> cartItems { get; set; }
        public string _type { get; set; }

        public int AddItemToCart(IProduct product)
        {
            cartItems.Add(product);
            count = cartItems.Count;
            //if(guid != Guid.Empty)
            //{
            //    CartNoSqlRepository cartNoSql = 
            //}
            return count;               
        }

        public int getCount()
        {
            return count;
        }
         
      
    }
}
