using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moviq.Interfaces.Models;
using Moviq.Interfaces.Repositories;
using Moviq.Interfaces.Services;

namespace Moviq.Domain.Order
{
    class OrderDomain
    {
        public OrderDomain(IRepository<IOrder> repo)
        {
            this.Repo = repo;
        }

        public IRepository<IOrder> Repo { get; set; }
    }
}
