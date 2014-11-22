namespace Moviq.Api
{
    using Moviq.Helpers;
    using Moviq.Interfaces.Services;
    using Nancy;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    public class CartModule : NancyModule
    {
        public CartModule(IModuleHelpers helper)
        {


            this.Get["/api/cart/"] = args =>
            {
                string test = "Test from API 12345";
                return helper.ToJson(test);
            };

        }
    }
}