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
    using System;
    using Nancy.Authentication.Forms;
    using Moviq.Domain.Auth;

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
            //container.Register<IRestClient, RestClient>().AsMultiInstance();

            container.Register<AnyLocale>().AsSingleton();
            RegisterILocale(container, "Locale\\en.json");

            container.Register<IRepository<IProduct>>((cntr, namedParams) =>
            {
                return new ProductNoSqlRepository(
                    container.Resolve<IFactory<IProduct>>(),
                    container.Resolve<ICouchbaseClient>(),
                    container.Resolve<ILocale>(),
                    // for some reason, resolving the RestClient throws a StackOverflow Exception
                    // so we'll new one up explicitly
                    new RestClient(), //container.Resolve<IRestClient>(),
                    "http://localhost:9200/moviq/_search");
            });

            container.Register<IFactory<IUser>, UserFactory>();
            container.Register<IUserRepository>((cntr, namedParams) =>
            {
                return new UserRepository(
                    container.Resolve<ICouchbaseClient>(),
                    container.Resolve<IFactory<IUser>>(),
                    container.Resolve<ILocale>(),
                    "http://localhost:9200/moviq/_search");
            });
            container.Register<IRepository<IUser>>((cntr, namedParams) =>
            {
                return container.Resolve<IUserRepository>();
            });
            container.Register<IUserMapper, UserMapper>();
            container.Register<IUserValidator, UserValidator>();
            container.Register<IUserProfileService, UserProfileService>().AsMultiInstance();
        }

        protected override void ConfigureRequestContainer(TinyIoCContainer container, NancyContext context)
        {
            // FUTURE: get the user's locale instead of hard-coding en.json
            RegisterILocale(container, "Locale\\en.json");
        }

        protected override void RequestStartup(TinyIoCContainer requestContainer, IPipelines pipelines, NancyContext context)
        {
            // At request startup we modify the request pipelines to
            // include forms authentication - passing in our now request
            // scoped user name mapper.
            //
            // The pipelines passed in here are specific to this request,
            // so we can add/remove/update items in them as we please.
            var formsAuthConfiguration =
                new FormsAuthenticationConfiguration()
                {
                    RedirectUrl = "~/login",
                    UserMapper = requestContainer.Resolve<IUserMapper>(),
                };

            FormsAuthentication.Enable(pipelines, formsAuthConfiguration);
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