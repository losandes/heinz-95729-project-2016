using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moviq.Interfaces.Models
{
    public interface IOrder
    {
        DateTime stamp { get; set; }

        string getOID();
        //ICart cart { get; set; }
        //ICard card { get; set; }
        //IShipping shipDetails { get; set; }
    }
}
