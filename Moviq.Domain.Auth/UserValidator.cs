namespace Moviq.Domain.Auth
{
    using Couchbase;
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces.Repositories;
    using Moviq.Interfaces.Services;
    using System;
    
    public class UserValidator : IUserValidator
    {
        public UserValidator(IUserRepository userRepo) 
        {
            this.userRepo = userRepo;
        }

        IUserRepository userRepo;

        public Guid? UserIsValid(string username, string password)
        {
            var user = userRepo.GetByUsername(username);

            if (user == null) 
            {
                return null;
            }

            if (PasswordHash.ValidatePassword(password, user.Password))
            {
                return user.Guid;
            }
            
            return null;
        }
    }
}
