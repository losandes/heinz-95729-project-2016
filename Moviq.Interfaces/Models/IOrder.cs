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

        string oid { get; set; }
        //ICart cart { get; set; }
        IDictionary<string, int> prodQuantity { get; set; }
        string card { get; set; }
        //double orderTotal { get; set; }
        decimal totalAmount { get; set; }
        int totalQty { get; set; }
    }
}
