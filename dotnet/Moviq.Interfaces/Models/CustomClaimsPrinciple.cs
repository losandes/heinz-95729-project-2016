namespace Moviq.Interfaces.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.InteropServices;
    using System.Security.Principal;
    using System.Text;
    using System.Threading.Tasks;

    // Summary:
    //     Represents a claims principal.
    [Serializable]
    [ComVisible(true)]
    public class CustomClaimsPrincipal : ICustomClaimsPrincipal
    {
        /// <summary>
        /// Initializes a new instance of the Acatar.Shared.Models.CustomClaimsPrincipal class 
        /// from a user identity and an array of claims to which the user represented by that identity 
        /// may claim
        /// </summary>
        /// <param name="identity">A basic implementation of System.Security.Principal.IIdentity that represents any user</param>        
        public CustomClaimsPrincipal(ICustomClaimsIdentity identity)
        {
            Identity = identity;
        }

        /// <summary>
        /// Gets the System.Security.Principal.GenericIdentity of the user by the current Principal
        /// </summary>
        public virtual IIdentity Identity { get; protected set; }

        public virtual ICustomClaimsIdentity ClaimsIdentity
        {
            get
            {
                if (_claimsIdentity != null)
                    return _claimsIdentity;

                _claimsIdentity = (ICustomClaimsIdentity)Identity;
                return _claimsIdentity;
            }
        }
        private ICustomClaimsIdentity _claimsIdentity { get; set; }

        /// <summary>
        /// Obsolete: Use HasClaim instead
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        [Obsolete("Use ClaimsIdentity.HasClaim instead")]
        public bool IsInRole(string role)
        {
            return this.ClaimsIdentity.HasClaim(role);
        }
    }
}
