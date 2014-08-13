namespace Moviq.Domain.Books
{
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;

    public class MovieFactory : IFactory<IBook>
    {
        public IBook GetInstance()
        {
            return new Book() as IBook;
        }
    }
}
