using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moviq.Interfaces.Factories
{
    public interface IFactory<T>
    {
        T Make<T>();
    }
}
