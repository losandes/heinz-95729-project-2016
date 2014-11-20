using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moviq.Interfaces.Models
{
    public interface ILocale
    {
        string ProductSetFailure { get; set; }
        string UserSetFailure { get; set; }
        string LiskovSubstitutionInfraction { get; set; }
    }
}
