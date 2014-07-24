namespace Moviq.Interfaces.Repositories
{
    using System;
    using System.Collections.Generic;

    public interface IRepository<T> : IDisposable
    {
        T Get(int id);
        T Set(T movie);
        IEnumerable<T> List(int take, int skip);
        IEnumerable<T> Find(string searchBy);
        bool Delete(int id);
    }
}
