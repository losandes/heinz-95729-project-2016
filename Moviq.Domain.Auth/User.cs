namespace Moviq.Domain.Auth
{
    using Moviq.Interfaces.Models;
    using Nancy.Security;
    using System;
    using System.Collections.Generic;

    public class User : IUser, IUserIdentity, IHelpCategorizeNoSqlData
    {
        public User() 
        {
            this._type = "user";
        }

        public Guid Guid { get; set; } 
        public string Name { get; set; }
        public string Email { get; set; }
        public string UserName { get { return Email; } }
        public string Password { get; set; }
        public IEnumerable<string> Claims { get; set; }
        public string _type { get; set; }
    }
}
