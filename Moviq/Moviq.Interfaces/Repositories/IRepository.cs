namespace Moviq.Interfaces.Repositories
{
    using System;
    using System.Collections.Generic;

    public interface IRepository<T> : IDisposable
    {
        T Get(int id);
        T Set(T movie);
        ICollection<T> List(int take, int skip);
        ICollection<T> Find(string searchBy);
        bool Delete(int id);
    }
}
