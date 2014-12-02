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

        int AddItemToCart(IProduct product);
    }
}
