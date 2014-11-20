namespace Moviq.Domain.Auth
{
    using Moviq.Interfaces.Models;

    /// <summary>
    /// A service for managing user information (i.e. user registration, password changes, etc.)
    /// </summary>
    public interface IUserProfileService
    {
        /// <summary>
        /// Hashes the user's chosen password and then persists the user data
        /// </summary>
        /// <param name="user">The user being registered</param>
        /// <returns>The user that was registered</returns>
        IUser RegisterUser(IUser user);
    }
}
