using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moviq.Interfaces.Repositories
{
    public interface IRepository<T>
    {
        T Get(int Id);
        T Set(T movie);
        ICollection<T> List(int take, int skip);
        ICollection<T> Find(string searchBy);
        bool Delete(int Id);
    }
}
