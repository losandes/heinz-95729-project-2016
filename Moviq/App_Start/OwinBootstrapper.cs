using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Moviq.OwinBootstrapper))]
namespace Moviq
{
    /// <summary>
    /// OWIN Startup
    /// </summary>
    public class OwinBootstrapper
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseNancy();
        }
    }
}