namespace App.Controllers
{
    using Nancy;

    public class HomeModule : NancyModule
    {
        public HomeModule()
        {
            Get["/"] = args =>
            {
                return View["home/home.html"];
            };

            Get["/tests"] = args =>
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
