using Moviq.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Moviq.Interfaces
{
    public static class AmbientContext
    {
        public const string UserPrincipalNameAttributeKey = "user::principal::name";
        public const string UserPrincipalGuidAttributeKey = "user::principal::guid";
        public const string UserPrincipalEmailAttributeKey = "user::principal::email";
        public const string ClaimsAttributeKey = "claims";

        public static ICustomClaimsPrincipal CurrentClaimsPrinciple 
        { 
            get 
            {
                return Thread.CurrentPrincipal as ICustomClaimsPrincipal;
            }
            set 
            {
                Thread.CurrentPrincipal = value;
            }
        }
    }
}
