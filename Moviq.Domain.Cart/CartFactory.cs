using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moviq.Domain.Cart
{
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;

    public class CartFactory : IFactory<ICart>
    {
        public ICart GetInstance()
        {
            return new Cart(Guid.Empty) as ICart;
        }
    }
}
