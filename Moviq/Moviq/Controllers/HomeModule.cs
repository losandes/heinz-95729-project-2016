namespace Moviq.Controllers
{
    using Nancy;

    public class HomeModule : NancyModule
    {
        public HomeModule() 
        {
            this.Get["/"] = args => 
            {
                return View["home/home.html"];
            };

            this.Get["/tests"] = args =>
            {
                return View["test/tests.html"];
            };

            // catch-all route
            Get["{greedy*}"] = x =>
            {
                return View["home/home.html"];
            };
        }
    }
}