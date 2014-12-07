using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moviq.Interfaces.Models
{
    public interface IOrderHistory
    {
        string _type {get; set;}
        ICollection<string> orders { get; set; }
        Guid guid { get; set; }

        void addOrder(string oID);
    }
}
