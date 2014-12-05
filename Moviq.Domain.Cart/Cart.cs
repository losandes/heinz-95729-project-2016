using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moviq.Interfaces.Models;

namespace Moviq.Domain.Cart
{
    public class Cart : ICart, IHelpCategorizeNoSqlData
    {
        #region attributes
        public int count { get; set; }
        public decimal totalPrice { get; set; }
        public Guid guid { get; set; }
        public ICollection<IProduct> cartItems { get; set; }
        public string _type { get; set; }
        public IDictionary<string, int> prodQuantity { get; set; }
        #endregion

        public Cart(Guid guid)
        {
            this._type = "cart";
            this.count = 0;
            this.guid = guid ;
            this.totalPrice = 0;            
        }

        public int AddItemToCart(IProduct product)
        {               
            if(prodQuantity.ContainsKey(product.Uid) && cartItems.Contains(product))
            {
                int quantity = 0;
                prodQuantity.TryGetValue(product.Uid, out quantity);
                prodQuantity.Add(product.Uid, quantity+1);
            }
            else
            {
                cartItems.Add(product);
                prodQuantity.Add(product.Uid,1);
            }
            totalPrice += product.Price;
            count += 1;       
                        
            //if(guid != Guid.Empty)
            //{
            //    CartNoSqlRepository cartNoSql = 
            //}
            return count;               
        }

        public void AddItemQuantToCart(IProduct prod, int quantity)
        {
            if (prodQuantity.ContainsKey(prod.Uid))
            {
                int currQuantity = 0;
                prodQuantity.TryGetValue(prod.Uid, out currQuantity);
                prodQuantity.Add(prod.Uid, (currQuantity + quantity));
            }
            else
            {
                cartItems.Add(prod);
                prodQuantity.Add(prod.Uid, quantity);
            }
        }
        
        public bool deleteItemFromCart(IProduct product)
        {
            bool res = false;

            int quantity = 0; 
            prodQuantity.TryGetValue(product.Uid, out quantity);

            totalPrice -= (product.Price * quantity);            
            count -= quantity;
            res = cartItems.Remove(product);
            prodQuantity.Remove(product.Uid);

            return res;
        }

        //calculate the total price of items in the cart.
        public void calTotalPrice()
        {
            decimal total = 0;
            foreach (IProduct prod in cartItems)
            {
                int quant = 0;
                prodQuantity.TryGetValue(prod.Uid, out quant);
                total += (prod.Price * quant);
            }
            totalPrice = total;
        }

        //calculate the number of items in the cart.
        public void calCount()
        {
            KeyValuePair<string,int> kv = new KeyValuePair<string,int>();
            IEnumerator<KeyValuePair<string,int>> iterator = prodQuantity.GetEnumerator();
            int totalQuantity = 0;
            
            while(iterator.MoveNext())
            {
                kv = iterator.Current;
                totalQuantity = totalQuantity + kv.Value;                                
            }
            count = totalQuantity;           
        }
        
        //get oldCart from couchbase and merge withe the current cart items. 
        //foreach product in oldCart add the quantity to the product in the current cart
        public void mergeCart (ICart oldCart)
        {
            ICollection<IProduct> oldItems = oldCart.cartItems;
            int quant = 0;
            foreach (IProduct prod in oldItems)
            {
                oldCart.prodQuantity.TryGetValue(prod.Uid, out quant);
                AddItemQuantToCart(prod, quant);
                //count += quant;
                //totalPrice += (prod.Price * quant);
            }
            calCount();
            calTotalPrice();
        }

        public void updateQuantity(string uid, int quant)
        {
            prodQuantity.Add(uid, quant);
            calCount();
            calTotalPrice();
        }
      
    }
}
