using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moviq.Interfaces.Factories;
using Moviq.Interfaces.Models;

namespace Moviq.Domain.Order
{
    public class OrderHistoryFactory : IFactory<IOrderHistory>
    {
        public IOrderHistory GetInstance()
        {
            return new OrderHistory() as IOrderHistory;
        }
    }
}
