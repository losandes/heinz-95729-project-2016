using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moviq.Domain.Order
{
    public class ShippingDetails
    {
        string address1;
        string address2;
        string city;
        string state;
        int zip;
        string country;

        public ShippingDetails(string add1, string add2, string cty, string st, int zipCode, string nation)
        {
            address1 = add1;
            address2 = add2;
            city = cty;
            state = st;
            zip = zipCode;
            country = nation;
        }
    }
}
