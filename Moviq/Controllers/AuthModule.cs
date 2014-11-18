namespace Moviq.Controllers
{
    using Nancy;
    using Nancy.Authentication.Forms;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    
    public class AuthModule : NancyModule
    {
        public AuthModule(IUserValidator userValidator) 
        {
            Get["/login"] = args =>
            {
                return View["auth/login.html"];
            };

            Get["/logout"] = args =>
            {
                return this.LogoutAndRedirect("~/");
            };

            Post["/login"] = args =>
            {

                var userGuid = userValidator.ValidateUser((string)this.Request.Form.Username, (string)this.Request.Form.Password);

                if (userGuid == null)
                {
                    return this.Context.GetRedirect("~/login?error=true&username=" + (string)this.Request.Form.Username);
                }

                DateTime? expiry = null;
                if (this.Request.Form.RememberMe.HasValue)
                {
                    expiry = DateTime.Now.AddDays(7);
                }

                return this.LoginAndRedirect(userGuid.Value, expiry);
            };        
        }
    }
}