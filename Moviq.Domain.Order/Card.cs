using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Moviq.Interfaces.Models;

namespace Moviq.Domain.Order
{
    public class Card : ICard
    {
        string ccNum;
        string name;
        int expMonth;
        int expYear;
        int cvv;

        public Card(string cc, string nam, int mon, int yr, int cvvNum )
        {
            ccNum = cc;
            name = nam;
            expMonth = mon;
            expYear = yr;
            cvv = cvvNum;
        }
    }
}
