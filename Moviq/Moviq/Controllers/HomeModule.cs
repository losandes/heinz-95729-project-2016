namespace Moviq.Controllers
{
    using Nancy;

    public class HomeModule : NancyModule
    {
        public HomeModule() 
        {
            this.Get["/"] = args => 
            {
                return View["home/home.html", new { foo = "bar" }];
            };
        }
    }
}