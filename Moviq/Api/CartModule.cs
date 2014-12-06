
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
    using Moviq.Domain.Products;

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
                var currUser = this.Context.CurrentUser;
                if (currUser != null)
                {
                    ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                    string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                    ICart cart;
                    cart = cartDomain.Repo.Get(guid);

                    //get the product details which needs to be added
                    //product = bookDomain.Repo.Get(args.uid);                

                    int count = cart.AddItemToCart(args.uid);
                    cart = cartDomain.Repo.Set(cart);
                    return helper.ToJson(count);
                }
                return helper.ToJson("user not logged in");
            };

            //on load of cart when cart-template is rendered. If cart empty then count will be zero
            this.Get["/api/cart/load"] = args =>
            {
                //identify user and get his/her cart
                var currUser = this.Context.CurrentUser;
                if (currUser != null)
                {
                    ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                    string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                    ICart cart;
                    cart = cartDomain.Repo.Get(guid);

                    return helper.ToJson(populateProducts(cart, bookDomain, guid));
                }
                return helper.ToJson("user not logged in");
            };

            //delete a product from user's cart
            this.Get["/api/cart/del/{uid}"] = args =>
            {
                //identify user and get his/her cart
                var currUser = this.Context.CurrentUser;
                if (currUser != null)
                {
                    ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                    string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                    ICart cart;
                    cart = cartDomain.Repo.Get(guid);

                    //get the product details which needs to be added
                    //product = bookDomain.Repo.Get(args.uid); 

                    //delete product from cart
                    bool result = cart.deleteItemFromCart(args.uid);

                    //persisting cart in couchbase
                    cart = cartDomain.Repo.Set(cart);

                    return helper.ToJson(populateProducts(cart, bookDomain, guid));
                }

                return helper.ToJson("user not logged in");
            };

            //checkout from cart page, merge the existing cart of user with old cart instance
            this.Get["/api/cart/merge"] = args =>
            {
                //pass cart with key as 'cart'
                ICart currCart = this.Context.Parameters.cart;

                //identify user and get his/her cart
                var currUser = this.Context.CurrentUser;
                if (currUser != null)
                {
                    ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                    string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                    //fetching old cart details
                    ICart oldCart = cartDomain.Repo.Get(guid);

                    //merge carts
                    currCart.mergeCart(oldCart);

                    //persisting cart in couchbase
                    currCart = cartDomain.Repo.Set(currCart);

                    return helper.ToJson(populateProducts(currCart, bookDomain, guid));
                }

                return helper.ToJson("user not logged in");
            };

            //update quantity
            this.Get["/api/cart/update", true] = async (args, cancellationToken) =>
            {
                //if parameters are passed like /api/cart/update/?u=uid&q=quantity
                var uid = this.Request.Query.u;
                var quant = this.Request.Query.q;
                //identify user and get his/her cart
                var currUser = this.Context.CurrentUser;
                if (currUser != null)
                {
                    ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                    string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                    //fetching old cart details
                    ICart cart = cartDomain.Repo.Get(guid);

                    //merge carts
                    cart.updateQuantity(uid, Int32.Parse(quant));

                    //persisting cart in couchbase
                    cart = cartDomain.Repo.Set(cart);

                    return helper.ToJson(populateProducts(cart, bookDomain, guid));
                }

                return helper.ToJson("user not logged in");
            };

            //clean cart
            this.Get["/api/cart/clean"] = args =>
            {
                //identify user and get his/her cart
                var currUser = this.Context.CurrentUser;
                if (currUser != null)
                {
                    ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                    string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                    bool res;
                    res = cartDomain.Repo.Delete(guid);
                    
                    return helper.ToJson(res);
                }
                return helper.ToJson("user not logged in");
            };
       
        }

        private CartProducts populateProducts(ICart cart, IProductDomain bookDomain, string guid)
        {
            CartProducts cartProds = new CartProducts(new Guid(guid));

            if (cart.prodQuantity.Count != 0)
            {
                List<string> keys = new List<string>(cart.prodQuantity.Keys);
                List<IProduct> productList = new List<IProduct>();

                foreach (string uid in keys)
                {
                    productList.Add(bookDomain.Repo.Get(uid));
                }
                cartProds.populateProducts(productList, cart.prodQuantity);
            }

            return cartProds;
        }
         
    }
}