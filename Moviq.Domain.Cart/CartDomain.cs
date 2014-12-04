using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moviq.Interfaces.Models;
using Moviq.Interfaces.Repositories;
using Moviq.Interfaces.Services;

namespace Moviq.Domain.Cart
{
    public class CartDomain :  ICartDomain
    {
        public CartDomain(IRepository<ICart> repo)
        {

            this.Repo = repo;
        }

        public IRepository<ICart> Repo { get; set; }
    }

    
}
