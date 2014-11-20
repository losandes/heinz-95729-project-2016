namespace Moviq.Controllers
{
    using Moviq.Domain.Auth;
    using Nancy;
    using Nancy.ModelBinding;
    using Nancy.Authentication.Forms;
    using Nancy.Extensions;
    using System;

    public class UserProfileModule : NancyModule
    {
        public UserProfileModule(IUserProfileService profiles) 
        {
            this.Post["/users/register"] = args => 
            {
                var user = this.Bind<User>();

                // TODO: Validate User
                var registeredUser = profiles.RegisterUser(user);

                if (registeredUser != null) 
                {
                    DateTime? expiry = null;
                    if (this.Request.Form.RememberMe.HasValue)
                    {
                        expiry = DateTime.Now.AddDays(7);
                    }

                    return this.LoginAndRedirect(registeredUser.Guid, expiry);
                }

                return 400;
            };
        
        }
    }
}