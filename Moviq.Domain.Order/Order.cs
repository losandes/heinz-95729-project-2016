using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moviq.Interfaces;
using Moviq.Interfaces.Models;
using RestSharp;
using Moviq.Domain.Products;

namespace Moviq.Domain.Order
{
    public class Order : IOrder, IHelpCategorizeNoSqlData
    {
        ICard card { get; set; }
        ICart cart { get; set; }
        IShipping shipDetails { get; set; }
        public string _type { get; set; }
        //public string guid { get; set; }
        //public IDictionary<string, int> prodQuantity { get; set; }
        //public List<Product> prodList { get; set; }
        //decimal amount { get; set; }
        //int totalQty { get; set; }
        public DateTime stamp { get; set; }

        public Order()
        {
            this._type = "order";
            //this.guid = guid.ToString();
            //prodList = new List<Product>();
            //amount = 0;
            //totalQty = 0;
            stamp = DateTime.Now;
        }

        public Order(ICart cart, ICard card, IShipping ship)
        {
            this._type = "order";
            stamp = DateTime.Now;
            this.card = card;
            this.cart = cart;
            this.shipDetails = ship;
        }

        public string getOID()
        {
            return _type + "::" + stamp.ToString();
        }
    }
}
