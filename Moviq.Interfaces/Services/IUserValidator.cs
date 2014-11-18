using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moviq.Interfaces.Services
{
    public interface IUserValidator
    {
        bool UserIsValid(string username, string password);
    }
}
