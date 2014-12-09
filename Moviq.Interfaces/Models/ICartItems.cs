using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moviq.Interfaces.Models
{
    public interface ICartItems
    {
        int count { get; set; }
        decimal totalPrice { get; set; }
        Guid guid { get; set; }
        ICollection<IProduct> cartItems { get; set; }
        //string _type { get; set; }
        IDictionary<string, int> prodQuantity { get; set; }

        void populateBooks(ICollection<IProduct> prodList, IDictionary<string, int> prodQuant);
    }
}
