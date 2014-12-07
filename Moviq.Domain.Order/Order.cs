using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moviq.Interfaces;
using Moviq.Interfaces.Models;
using RestSharp;

namespace Moviq.Domain.Order
{
    public class Order : IOrder, IHelpCategorizeNoSqlData
    {
        ICard card;
        IShipping shipDetails;
        public string _type { get; set; }
        //public string guid { get; set; }
        public IDictionary<string, int> prodQuantity { get; set; }
        decimal amount;
        int totalQty;
        public DateTime stamp { get; set; }

        public Order()
        {
            this._type = "order";
            //this.guid = guid.ToString();
            prodQuantity = new Dictionary<string, int>();
            amount = 0;
            totalQty = 0;
            stamp = DateTime.Now;
        }
    }
}
