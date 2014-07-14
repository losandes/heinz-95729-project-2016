namespace Moviq
{
    using Nancy;
    using Nancy.Bootstrapper;
    using Nancy.TinyIoc;

    public class NancyBootstrapper : DefaultNancyBootstrapper
    {
        protected override void ApplicationStartup(TinyIoCContainer container, IPipelines pipelines)
        {
             // your customization goes here
        }

        //protected override void ConfigureApplicationContainer(TinyIoCContainer container)
        //{
        //    // base.ConfigureApplicationContainer(container);
        //}

        //protected override void ConfigureRequestContainer(TinyIoCContainer container, NancyContext context)
        //{
        //    // base.ConfigureRequestContainer(container, context);
        //}

    }
}