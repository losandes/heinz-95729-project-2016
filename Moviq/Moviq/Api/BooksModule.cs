namespace Moviq.Api
{
    using Moviq.Helpers;
    using Moviq.Interfaces.Services;
    using Nancy;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    public class BooksModule : NancyModule
    {
        public BooksModule(IBookDomain bookDomain, IModuleHelpers helper) {
            
            this.Get["/api/books"] = args => {
                var take = Request.Query.take != null ? Request.Query.take : 20;
                var skip = Request.Query.skip != null ? Request.Query.skip : 0;

                return helper.ToJson(bookDomain.Repo.List(take, skip));
            };

        }
    }
}