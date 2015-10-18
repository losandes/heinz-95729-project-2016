using Moviq.Interfaces.Models;
using Moviq.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moviq.Domain.Auth
{
    /// <summary>
    /// Extends IRepository<IUser> to add specific repo queries
    /// </summary>
    public interface IUserRepository : IRepository<IUser>
    {
        /// <summary>
        /// Get a user by their username, instead of by GUID
        /// </summary>
        /// <param name="username">the user's username</param>
        /// <returns>The user that matches the username, if any</returns>
        IUser GetByUsername(string username);

        /// <summary>
        /// Checks to see if a user with a given username is already registered
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        bool UserExists(string username);
    }
}
