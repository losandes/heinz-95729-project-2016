namespace Moviq.Domain.Auth
{
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces.Repositories;
    using Nancy;
    using Nancy.Authentication.Forms;
    using Nancy.Security;
    using System;

    public class UserMapper : IUserMapper
    {
        public UserMapper(IRepository<IUser> userRepo) 
        {
            this.userRepo = userRepo;
        }

        IRepository<IUser> userRepo;

        public IUserIdentity GetUserFromIdentifier(Guid identifier, NancyContext context)
        {
            return ((User)userRepo.Get(identifier.ToString())) as IUserIdentity;
        }
    }
}
