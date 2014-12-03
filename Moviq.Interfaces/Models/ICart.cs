using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moviq.Interfaces.Models
{
    using System.Collections.Generic;
        
    public interface ICart
    {
        Guid guid { get; set;}
        ICollection<IProduct> cartItems { get; set; }
        IDictionary<string, int> prodQuantity { get; set; }

       // void calPrice();
        int AddItemToCart(IProduct product);
        //int calCount();
        bool deleteItemFromCart(IProduct product);
        void mergeCart(ICart oldCart);
        void updateQuantity(string uid, int quant);
    }
}
