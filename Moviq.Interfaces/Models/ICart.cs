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
        //ICollection<IProduct> cartItems { get; set; }
        IDictionary<string, int> prodQuantity { get; set; }

       // void calPrice();
        int AddItemToCart(string uid);
        //int calCount();
        bool deleteItemFromCart(string uid);
        void mergeCart(ICart oldCart);
        void updateQuantity(string uid, int quant);
    }
}
