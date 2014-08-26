namespace Moviq
{
    using Moviq.Domain.Books;
    using Moviq.Domain.Movies.Tests.Mocks;
    using Moviq.Domain.Products;
    using Moviq.Helpers;
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces.Repositories;
    using Moviq.Interfaces.Services;
    using Nancy;
    using Nancy.Bootstrapper;
    using Nancy.Conventions;
    using Nancy.TinyIoc;

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
            // base.ConfigureApplicationContainer(container);

            container.Register<IRepository<IProduct>, MockBookRepository>().AsMultiInstance();
            container.Register<IFactory<IProduct>, ProductFactory>().AsMultiInstance();

            container.Register<IModuleHelpers, ModuleHelpers>();

            container.Register<IBookDomain, BookDomain>().AsMultiInstance();
        }

        //protected override void ConfigureRequestContainer(TinyIoCContainer container, NancyContext context)
        //{
        //    // base.ConfigureRequestContainer(container, context);
        //}

    }
}