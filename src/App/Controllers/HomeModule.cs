namespace App.Controllers
{
    using Nancy;
    using System;
    using System.IO;

    public class HomeModule : NancyModule
    {
        // public HomeModule()
        // {
        //     Get["/"] = args =>
        //     {
        //         return View["home.html"];
        //     };
        //
        //     Get["/tests"] = args =>
        //     {
        //         return View["tests.html"];
        //     };
        //
        //     // catch-all route
        //     Get["{greedy*}"] = x =>
        //     {
        //         Console.WriteLine("greedy");
        //         return View["home.html"];
        //     };
        // }

         private readonly string _basePath;

         public HomeModule(NancyBootstrapper straps)
         {
            _basePath = Path.Combine(straps.RootPath.FullName, "Views");

             Get["/"] = _ => GetStaticIfAvailable();

             Get["{path*}"] = _ => GetStaticIfAvailable(_.path);
         }

         protected Response GetStaticIfAvailable(string path = null)
         {
             path = string.IsNullOrWhiteSpace(path) ? "" : path;
Console.WriteLine(Path.Combine(_basePath, path, "home.html"));
            var file = File.Exists(Path.Combine(_basePath, path) + ".html")
                 ? new FileInfo(Path.Combine(_basePath, path) + ".html")
                 : new FileInfo(Path.Combine(_basePath, path, "home.html"));

             if (!file.Exists)
                 return new Response { StatusCode = HttpStatusCode.NotFound };

             using (var reader = file.OpenText())
             {
                 return Response.AsText(reader.ReadToEnd(), "text/html");
             }
        }
    }
}
