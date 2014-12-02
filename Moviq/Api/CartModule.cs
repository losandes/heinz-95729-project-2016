
namespace Moviq.Api
{
    using Moviq.Helpers;
    using Moviq.Interfaces.Services;
    using Moviq.Interfaces.Models;
    using Nancy;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;
    using Nancy.TinyIoc;

    public class CartModule : NancyModule
    {
        public CartModule(IProductDomain bookDomain, ICartDomain cartDomain, IModuleHelpers helper, TinyIoCContainer container)
        {
            IProduct product;
            ICart cart = container.Resolve<ICart>();


            //add to cart when user is not logged in
            this.Get["/api/books/{uid}"] = args =>
            {
                product = bookDomain.Repo.Get(args.uid);
                return helper.ToJson(cart.AddItemToCart(product));                
            };

            //CHECK
            //when user is already logged in and perform add to cart
            this.Get["/api/books/{uid,guid}"] = args =>
            {
                product = bookDomain.Repo.Get(args.uid);
                //CEHCK if cart needs to be fetched
                
                int count = cart.AddItemToCart(product);
                cart = cartDomain.Repo.Set(cart);
                return helper.ToJson(count);
            };


       
        }
         
    }
}