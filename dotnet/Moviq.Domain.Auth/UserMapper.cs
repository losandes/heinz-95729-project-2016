namespace Moviq.Domain.Auth
{
    using Moviq.Interfaces;
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces.Repositories;
    using Nancy;
    using Nancy.Authentication.Forms;
    using Nancy.Security;
    using System;
    using System.Collections.Generic;

    public class UserMapper : IUserMapper
    {
        public UserMapper(IRepository<IUser> userRepo) 
        {
            this.userRepo = userRepo;
        }

        IRepository<IUser> userRepo;

        public IUserIdentity GetUserFromIdentifier(Guid identifier, NancyContext context)
        {
            var user = (User)userRepo.Get(identifier.ToString());
            var identity = new CustomClaimsIdentity(user.UserName);
            identity.AddAttributes(new Dictionary<string, object> { 
                { AmbientContext.UserPrincipalGuidAttributeKey, user.Guid },
                { AmbientContext.UserPrincipalEmailAttributeKey, user.Email }
            });

            var principle = new CustomClaimsPrincipal(identity);
            AmbientContext.CurrentClaimsPrinciple = principle;

            return user as IUserIdentity;
        }
    }
}
