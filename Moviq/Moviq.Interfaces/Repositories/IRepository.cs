namespace Moviq.Interfaces.Repositories
{
    using System.Collections.Generic;

    public interface IRepository<T>
    {
        T Get(int Id);
        T Set(T movie);
        ICollection<T> List(int take, int skip);
        ICollection<T> Find(string searchBy);
        bool Delete(int Id);
    }
}
