namespace Moviq.Api
{
    using Moviq.Domain.Auth;
    using Moviq.Interfaces;
    using Moviq.Interfaces.Models;
    using Nancy;
    using Nancy.Security;
    using System;

    public class ExampleSecureModule : NancyModule
    {
        public ExampleSecureModule(IUserRepository userRepo) 
        {
            this.RequiresAuthentication();

            this.Get["/api/examples/ambientContext"] = args =>
            {
                ICustomClaimsIdentity currentUser = AmbientContext.CurrentClaimsPrinciple.Identity as ICustomClaimsIdentity;
                string guid = currentUser.GetAttribute(AmbientContext.UserPrincipalGuidAttributeKey).ToString();

                var user = userRepo.Get(guid);
                return 200;
            };

            this.Get["/api/examples/context"] = args =>
            {
                var currentUser = this.Context.CurrentUser;
                string guid = currentUser.UserName;

                var user = userRepo.GetByUsername(guid);
                return 200;
            };
        }
    }
}