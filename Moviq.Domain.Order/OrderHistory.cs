using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moviq.Interfaces.Models;

namespace Moviq.Domain.Order
{
    public class OrderHistory : IOrderHistory, IHelpCategorizeNoSqlData
    {
        public string _type { get; set; }
        public ICollection<string> orders { get; set; }
        public Guid guid { get; set; }

        public OrderHistory()
        {
            this._type = "orderHistory";
            orders = new List<string>();
            this.guid = Guid.Empty;
        }

        public OrderHistory(Guid guid)
        {
            this._type = "orderHistory";
            //this.guid = guid.ToString();
            orders = new List<string>();
            this.guid = guid;
        }

        public void addOrder(string oID)
        {
            orders.Add(oID);
        }
    }
}
