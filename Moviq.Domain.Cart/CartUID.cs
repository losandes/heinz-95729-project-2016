using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moviq.Interfaces.Models;
//using Moviq.Domain.Products;

namespace Moviq.Domain.Cart
{
    public class CartUID : ICart, IHelpCategorizeNoSqlData
    {
        #region attributes
        //public int count { get; set; }
        //public decimal totalPrice { get; set; }
        public Guid guid { get; set; }
        //public ICollection<string> cartItems { get; set; }
        public string _type { get; set; }
        public IDictionary<string, int> prodQuantity { get; set; }
        #endregion

        public CartUID(Guid guid)
        {
            this._type = "cart";
            //this.count = 0;
            this.guid = guid ;
            //this.totalPrice = 0; 
            //cartItems = new List<string>();
            prodQuantity = new Dictionary<string,int>();
        }

        public int AddItemToCart(string uid)
        {               
            if(prodQuantity.ContainsKey(uid))
            {
                int quantity = 0;
                prodQuantity.TryGetValue(uid, out quantity);
                prodQuantity.Remove(uid);
                prodQuantity.Add(uid, quantity+1);
            }
            else
            {
                //cartItems.Add(product);
                prodQuantity.Add(uid,1);
            }
            //totalPrice += product.Price;
            //count += 1;       
                        
            //if(guid != Guid.Empty)
            //{
            //    CartNoSqlRepository cartNoSql = 
            //}
            return calCount();               
        }

        public void AddItemQuantToCart(string uid, int quantity)
        {
            if (prodQuantity.ContainsKey(uid))
            {
                int currQuantity = 0;
                prodQuantity.TryGetValue(uid, out currQuantity);
                prodQuantity.Remove(uid);
                prodQuantity.Add(uid, (currQuantity + quantity));
            }
            else
            {
                //cartItems.Add(prod);
                prodQuantity.Add(uid, quantity);
            }
        }

        public bool deleteItemFromCart(string uid)
        {
            bool res = false;

            //int quantity = 0;
            //prodQuantity.TryGetValue(uid, out quantity);

            //totalPrice -= (product.Price * quantity);
            
            //res = cartItems.Remove(product);
            res = prodQuantity.Remove(uid);
            //calCount();
            return res;
        }

        //calculate the total price of items in the cart.
        //public void calTotalPrice()
        //{
        //    decimal total = 0;
        //    foreach (IProduct prod in cartItems)
        //    {
        //        int quant = 0;
        //        prodQuantity.TryGetValue(prod.Uid, out quant);
        //        total += (prod.Price * quant);
        //    }
        //    totalPrice = total;
        //}

        //calculate the number of items in the cart.
        public int calCount()
        {            
            KeyValuePair<string,int> kv = new KeyValuePair<string,int>();
            IEnumerator<KeyValuePair<string,int>> iterator = prodQuantity.GetEnumerator();
            int totalQuantity = 0;
            
            while(iterator.MoveNext())
            {
                kv = iterator.Current;
                totalQuantity += kv.Value;                                
            }
            return totalQuantity;           
        }
        
        //get oldCart from couchbase and merge withe the current cart items. 
        //foreach product in oldCart add the quantity to the product in the current cart
        public void mergeCart(ICart oldCart)
        {
            List<string> oldItems = new List<string>(oldCart.prodQuantity.Keys);
            int quant = 0;
            foreach (string uid in oldItems)
            {
                oldCart.prodQuantity.TryGetValue(uid, out quant);
                AddItemQuantToCart(uid, quant);
                //count += quant;
                //totalPrice += (prod.Price * quant);
            }
            //calCount();
            //calTotalPrice();
        }

        public void updateQuantity(string uid, int quant)
        {
            prodQuantity.Remove(uid);
            prodQuantity.Add(uid, quant);
            //calCount();
            //calTotalPrice();
        }
      
    }
}
