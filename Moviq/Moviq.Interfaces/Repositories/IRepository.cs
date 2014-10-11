namespace Moviq.Interfaces.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IRepository<T> : IDisposable
    {
        T Get(string id);
        T Set(T product);
        IEnumerable<T> List(int take, int skip);
        Task<IEnumerable<T>> Find(string searchBy);
        bool Delete(string id);
    }
}
