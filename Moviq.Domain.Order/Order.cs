using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moviq.Interfaces;
using Moviq.Interfaces.Models;
using RestSharp;
using Moviq.Domain.Products;
using Moviq.Domain.Cart;

namespace Moviq.Domain.Order
{
    public class Order : IOrder, IHelpCategorizeNoSqlData
    {
        public string card { get; set; }
        //public ICart cart { get; set; }
        public string _type { get; set; }
        //public string guid { get; set; }
        public IDictionary<string, int> prodQuantity { get; set; }
        //public List<Product> prodList { get; set; }
        public decimal totalAmount { get; set; }
        public int totalQty { get; set; }
        public DateTime stamp { get; set; }
        public string oid { get; set; }
        //public double orderTotal { get; set; }


        public Order()
        {
            this._type = "order";
            //this.guid = guid.ToString();
            //prodList = new List<Product>();
            totalAmount = 0;
            totalQty = 0;
            stamp = DateTime.Now;
            this.oid = Guid.NewGuid().ToString();
        }

        public Order(ICart cart, string card, decimal total, int qty)
        {
            this._type = "order";
            stamp = DateTime.Now;
            this.card = card;
            //this.cart = cart;
            this.prodQuantity = cart.prodQuantity;
            this.oid = Guid.NewGuid().ToString();
            
            //this.orderTotal = -1;
            this.totalAmount = total;
            this.totalQty = qty;
        }

        
    }
}
