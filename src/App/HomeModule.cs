namespace App
{
    using Nancy;
    using App.Domain.Auth;

    public class HomeModule : NancyModule
    {
        public HomeModule(IClass1 clt)
        {
            Get["/"] = _ => clt.Test();
        }
    }
}
