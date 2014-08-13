namespace Moviq.Domain.Books
{
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces.Repositories;
    using Moviq.Interfaces.Services;

    public class BookDomain : IBookDomain
    {
        public BookDomain(IRepository<IProduct> bookRepo)
        {
            this.Repo = bookRepo;
        }

        public IRepository<IProduct> Repo { get; set; }
    }
}
