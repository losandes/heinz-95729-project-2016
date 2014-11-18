namespace Moviq.Domain.Auth
{
    using Nancy;
    using Nancy.Authentication.Forms;
    using Nancy.Security;
    using System;

    public class UserMapper : IUserMapper
    {
        public IUserIdentity GetUserFromIdentifier(Guid identifier, NancyContext context)
        {
            throw new NotImplementedException();
        }
    }
}
