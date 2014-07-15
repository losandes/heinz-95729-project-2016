namespace Moviq.Domain.Movies
{
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces.Repositories;
    using Moviq.Interfaces.Services;

    public class MovieDomain : IMovieDomain
    {
        public MovieDomain(IRepository<IProduct> movieRepo)
        {
            this.movieRepo = movieRepo;
        }

        IRepository<IProduct> movieRepo;
    }
}
