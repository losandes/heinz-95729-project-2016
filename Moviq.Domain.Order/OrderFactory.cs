using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moviq.Interfaces.Factories;
using Moviq.Interfaces.Models;

namespace Moviq.Domain.Order
{
    class OrderFactory : IFactory<IOrder>
    {
        public IOrder GetInstance()
        {
            return new Order() as IOrder;
        }
    }
}
