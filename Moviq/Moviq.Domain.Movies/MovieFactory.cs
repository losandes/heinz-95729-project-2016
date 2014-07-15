namespace Moviq.Domain.Movies
{
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;

    public class MovieFactory : IFactory<IMovie>
    {
        public IMovie GetInstance()
        {
            return new Movie() as IMovie;
        }
    }
}
