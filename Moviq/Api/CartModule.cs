
namespace Moviq.Api
{
    using Moviq.Helpers;
    using Moviq.Interfaces.Services;
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces;
    using Nancy;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;
    using Nancy.TinyIoc;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Moviq.Domain.Auth;
    using Moviq.Domain.Cart;

    public class CartModule : NancyModule
    {
        public CartModule(IProductDomain bookDomain, ICartDomain cartDomain, IModuleHelpers helper, TinyIoCContainer container)
        {
            IProduct product;
            //ICart cart = container.Resolve<ICart>();


            //add to cart when user is not logged in
            //this.Get["/api/books/{uid}"] = args =>
            //{
            //    product = bookDomain.Repo.Get(args.uid);
            //    return helper.ToJson(cart.AddItemToCart(product));                
            //};

            
            //when user is already logged in and perform add to cart
            this.Get["/api/cart/add/{uid}"] = args =>
            {
                //identify user and get his/her cart
                ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();
                    
                ICart cart;                
                cart = cartDomain.Repo.Get(guid);

                //get the product details which needs to be added
                product = bookDomain.Repo.Get(args.uid);                
                
                int count = cart.AddItemToCart(product);
                cart = cartDomain.Repo.Set(cart);
                return helper.ToJson(count);
            };

            //on load of cart when cart-template is rendered. If cart empty then count will be zero
            this.Get["/api/cart/load"] = args =>
            {
                //identify user and get his/her cart
                ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                ICart cart;
                cart = cartDomain.Repo.Get(guid);
                                
                return helper.ToJson(cart);
            };

            //delete a product from user's cart
            this.Get["/api/cart/del/{uid}"] = args =>
            {
                //identify user and get his/her cart
                ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                ICart cart;
                cart = cartDomain.Repo.Get(guid);
                                
                //get the product details which needs to be added
                product = bookDomain.Repo.Get(args.uid); 
               
                //delete product from cart
                bool result = cart.deleteItemFromCart(product);

                //persisting cart in couchbase
                cart = cartDomain.Repo.Set(cart);

                return helper.ToJson(cart);
            };

            //checkout from cart page, merge the existing cart of user with old cart instance
            this.Get["/api/cart/merge"] = args =>
            {
                ICart currCart = this.Context.Parameters;

                //identify user and get his/her cart
                ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                //fetching old cart details
                ICart oldCart = cartDomain.Repo.Get(guid);

                //merge carts
                currCart.mergeCart(oldCart);
               
                //persisting cart in couchbase
                currCart = cartDomain.Repo.Set(currCart);

                return helper.ToJson(currCart);
            };

            //update quantity
            this.Get["/api/cart/update/{uid,quant}"] = args =>
            {                
                //identify user and get his/her cart
                ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                //fetching old cart details
                ICart cart = cartDomain.Repo.Get(guid);

                //merge carts
                cart.updateQuantity(args.uid, args.quant);

                //persisting cart in couchbase
                cart = cartDomain.Repo.Set(cart);

                return helper.ToJson(cart);
            };
       
        }
         
    }
}