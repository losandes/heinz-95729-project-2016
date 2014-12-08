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
    public class OrderHistoryDomain : IOrderHistoryDomain
    {
        public OrderHistoryDomain(IRepository<IOrderHistory> repo)
        {
            this.Repo = repo;
        }

        public IRepository<IOrderHistory> Repo { get; set; }
    }
}
