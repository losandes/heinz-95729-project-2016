namespace Moviq.Api
{
    using Moviq.Domain.Auth;
    using Moviq.Interfaces;
    using Moviq.Interfaces.Models;
    using Nancy;
    using Nancy.Security;
    using Newtonsoft.Json;
    using System;

    public class ExampleSecureModule : NancyModule
    {
        public ExampleSecureModule(IUserRepository userRepo) 
        {
            this.RequiresAuthentication();

            this.Get["/api/examples/ambientContext"] = args =>
            {
                ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.ClaimsIdentity;
                string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                var user = userRepo.Get(guid);
                user.Password = null;

                return JsonConvert.SerializeObject(user);
                //return 200;
            };

            this.Get["/api/examples/context"] = args =>
            {
                var currentUser = this.Context.CurrentUser;
                string username = currentUser.UserName;

                var user = userRepo.GetByUsername(username);
                user.Password = null;

                return JsonConvert.SerializeObject(user);
            };
        }
    }
}