namespace Moviq
{
    using Couchbase;
    using Moviq.Domain.Products.Tests.Mocks;
    using Moviq.Domain.Products;
    using Moviq.Helpers;
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces.Repositories;
    using Moviq.Interfaces.Services;
    using Moviq.Locale;
    using Nancy;
    using Nancy.Bootstrapper;
    using Nancy.Conventions;
    using Nancy.TinyIoc;
    using RestSharp;
    using System.IO;

    public class NancyBootstrapper : DefaultNancyBootstrapper
    {
        protected override void ApplicationStartup(TinyIoCContainer container, IPipelines pipelines)
        {
             // your customization goes here
        }

        protected override void ConfigureConventions(NancyConventions conventions)
        {
            base.ConfigureConventions(conventions);

            conventions.StaticContentsConventions.Add(
                StaticContentConventionBuilder.AddDirectory("js", @"Js")
            );
            conventions.StaticContentsConventions.Add(
                StaticContentConventionBuilder.AddDirectory("css", @"Css")
            );
            conventions.StaticContentsConventions.Add(
                StaticContentConventionBuilder.AddDirectory("images", @"Images")
            );
        }

        protected override void ConfigureApplicationContainer(TinyIoCContainer container)
        {
            container.Register<IFactory<IProduct>, ProductFactory>().AsMultiInstance();

            container.Register<IModuleHelpers, ModuleHelpers>();

            container.Register<IProductDomain, ProductDomain>().AsMultiInstance();

            container.Register<ICouchbaseClient, CouchbaseClient>().AsSingleton();
            container.Register<IRestClient, RestClient>().AsMultiInstance();

            container.Register<AnyLocale>().AsSingleton();
            RegisterILocale(container, "Locale\\en.json");

            container.Register<IRepository<IProduct>>((cntr, namedParams) =>
            {
                return new ProductNoSqlRepository(
                    container.Resolve<IFactory<IProduct>>(),
                    container.Resolve<ICouchbaseClient>(),
                    container.Resolve<ILocale>(),
                    container.Resolve<IRestClient>(),
                    "http://localhost:9200/moviq/_search");
            });
        }

        protected override void ConfigureRequestContainer(TinyIoCContainer container, NancyContext context)
        {
            // FUTURE: get the user's locale instead of hard-coding en.json
            RegisterILocale(container, "Locale\\en.json");
        }

        private void RegisterILocale(TinyIoCContainer container, string locale) 
        {
            container.Register<ILocale>((cntr, namedParams) =>
            {

                var path = new DefaultRootPathProvider().GetRootPath() + locale;
                return container.Resolve<AnyLocale>().GetLocale(path);
            });        
        }

    }
}