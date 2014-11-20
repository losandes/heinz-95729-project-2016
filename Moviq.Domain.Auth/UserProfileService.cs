namespace Moviq.Domain.Auth
{
    using Moviq.Interfaces.Models;
    using System;


    public class UserProfileService : IUserProfileService
    {
        public UserProfileService(IUserRepository userRepo) 
        {
            this.userRepo = userRepo;
        }

        IUserRepository userRepo;

        public IUser RegisterUser(IUser user)
        {
            if (userRepo.UserExists(user.UserName)) 
            {
                throw new UserExistsException();
            }

            var hashedPassword = PasswordHash.CreateHash(user.Password);
            user.Password = hashedPassword;
            user.Guid = Guid.NewGuid();

            return userRepo.Set(user);
        }
    }
}
