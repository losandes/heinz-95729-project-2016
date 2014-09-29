namespace Moviq.Api
{
    using Moviq.Helpers;
    using Moviq.Interfaces.Services;
    using Nancy;

    public class SearchModule : NancyModule
    {
        public SearchModule(IProductDomain products, IModuleHelpers helper) 
        {
            this.Get["/api/search", true] = async (args, cancellationToken) =>
            {
                var searchTerm = this.Request.Query.q;
                var result = await products.Repo.Find(searchTerm);
                return helper.ToJson(result);
            };        
        }
    }
}