namespace Moviq.Controllers
{
    using Nancy;

    public class HomeModule : NancyModule
    {
        public HomeModule() 
        {
            this.Get["/"] = args => 
            {
                return "Hello World!";
            };
        }
    }
}