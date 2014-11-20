namespace Moviq.Domain.Auth
{
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;

    public class UserFactory : IFactory<IUser>
    {
        public IUser GetInstance()
        {
            return new User() as IUser;
        }
    }
}
