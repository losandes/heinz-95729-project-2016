namespace Moviq.Interfaces.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.InteropServices;
    using System.Security;
    using System.Security.Principal;

    // Inspiration from:
    // http://dotnetinside.com/in/type/mscorlib/ClaimsIdentity/4.0.0.0
    // http://dotnetinside.com/in/type/mscorlib/GenericIdentity/4.0.0.0
    // https://github.com/NancyFx/Nancy/blob/master/src/Nancy/Security/UserIdentityExtensions.cs
    [ComVisible(true)]
    [Serializable]
    public class CustomClaimsIdentity : ICustomClaimsIdentity
    {
        public virtual string AuthenticationType { get; protected set; }
        public virtual string Name { get; protected set; }
        public virtual IEnumerable<string> Claims
        {
            get
            {
                foreach (var claim in _claims)
                {
                    yield return claim;
                }
                yield break;
            }
        }
        protected List<string> _claims { get; set; }

        public virtual IDictionary<string, object> Attributes
        {
            get
            {
                return _attributes;
            }
        }
        protected Dictionary<string, object> _attributes { get; set; }

        public virtual bool IsAuthenticated
        {
            get
            {
                return !this.Name.Equals("");
            }
        }

        /// <summary>
        /// Initializes an instance of a CustomClaimsIdentity (System.Security.Principal.IIdentity that represents any user)
        /// </summary>
        /// <param name="name">the UserName of the current user</param>
        [SecuritySafeCritical]
        public CustomClaimsIdentity(string name)
            : this(name, "")
        {

        }

        /// <summary>
        /// Initializes an instance of a CustomClaimsIdentity (System.Security.Principal.IIdentity that represents any user)
        /// </summary>
        /// <param name="name">the UserName of the current user</param>
        /// <param name="claims">An array of claims to which the user represented by the identity parameter may claim</param>
        [SecuritySafeCritical]
        public CustomClaimsIdentity(string name, IEnumerable<string> claims)
            : this(name, "", claims)
        {

        }

        /// <summary>
        /// Initializes an instance of a CustomClaimsIdentity (System.Security.Principal.IIdentity that represents any user)
        /// </summary>
        /// <param name="name">the UserName of the current user</param>
        /// <param name="type">the type of authentication used</param>
        [SecuritySafeCritical]
        public CustomClaimsIdentity(string name, string type)
            : this(name, type, null)
        {

        }

        /// <summary>
        /// Initializes an instance of a CustomClaimsIdentity (System.Security.Principal.IIdentity that represents any user)
        /// </summary>
        /// <param name="name">the UserName of the current user</param>
        /// <param name="type">the type of authentication used</param>
        /// <param name="claims">An array of claims to which the user represented by the identity parameter may claim</param>
        [SecuritySafeCritical]
        public CustomClaimsIdentity(string name, string type, IEnumerable<string> claims)
            : this(name, type, claims, null)
        {

        }

        /// <summary>
        /// Initializes an instance of a CustomClaimsIdentity (System.Security.Principal.IIdentity that represents any user)
        /// </summary>
        /// <param name="name">the UserName of the current user</param>
        /// <param name="type">the type of authentication used</param>
        /// <param name="claims">An array of claims to which the user represented by the identity parameter may claim</param>
        [SecuritySafeCritical]
        public CustomClaimsIdentity(string name, string type, IEnumerable<string> claims, Dictionary<string, object> attributes)
        {
            if (name == null)
            {
                throw new ArgumentNullException("name");
            }
            if (type == null)
            {
                throw new ArgumentNullException("type");
            }

            if (claims == null)
                _claims = new List<string>();
            else
                _claims = claims.ToList();

            if (attributes == null)
                _attributes = new Dictionary<string, object>();
            else
                _attributes = attributes;

            this.Name = name;
            this.AuthenticationType = "";
            this.AddNameAttribute();
        }

        protected CustomClaimsIdentity(CustomClaimsIdentity identity)
        {
            this.Name = identity.Name;
            this.AuthenticationType = identity.AuthenticationType;
            this._claims = identity._claims;
            this._attributes = identity._attributes;
        }

        public virtual ICustomClaimsIdentity Clone()
        {
            return new CustomClaimsIdentity(this);
        }

        [SecurityCritical]
        public virtual bool AddClaim(string claim)
        {
            if (claim == null)
                throw new ArgumentNullException("claim");

            this._claims.Add(claim);
            return this._claims.Contains(claim);
        }

        [SecurityCritical]
        public virtual void AddClaims(IEnumerable<string> claims)
        {
            if (claims == null)
                throw new ArgumentNullException("claims");

            foreach (string current in claims)
            {
                if (current != null)
                {
                    this.AddClaim(current);
                }
            }
        }

        [SecurityCritical]
        public virtual bool TryRemoveClaim(string claim)
        {
            bool result = false;
            for (int i = 0; i < this._claims.Count; i++)
            {
                if (String.Equals(this._claims[i], claim))
                {
                    this._claims.RemoveAt(i);
                    result = true;
                    break;
                }
            }
            return result;
        }

        [SecurityCritical]
        public virtual void RemoveClaim(string claim)
        {
            if (!this.TryRemoveClaim(claim))
            {
                throw new InvalidOperationException("InvalidOperation_ClaimCannotBeRemoved: " + claim);
            }
        }

        [SecurityCritical]
        public virtual bool AddAttribute(string name, object value)
        {
            if (String.IsNullOrWhiteSpace(name))
                throw new ArgumentNullException("name");

            if (value == null)
                throw new ArgumentNullException("value");

            return this.SetAttribute(name, value);
        }

        [SecurityCritical]
        public virtual void AddAttributes(Dictionary<string, object> attributes)
        {
            if (attributes == null)
                throw new ArgumentException("attributes");

            foreach (var item in attributes)
            {
                if (this._attributes.ContainsKey(item.Key))
                    this._attributes[item.Key] = item.Value;
                else
                    this._attributes.Add(item.Key, item.Value);
            }
        }

        [SecurityCritical]
        public virtual bool RemoveAttribute(string name)
        {
            if (this._attributes.ContainsKey(name))
                return this._attributes.Remove(name);
            return false;
        }

        [SecurityCritical]
        public virtual bool SetAttribute(string name, object value)
        {
            this.RemoveAttribute(name);
            this._attributes.Add(name, value);
            return this._attributes.ContainsKey(name);
        }

        [SecuritySafeCritical]
        private void AddNameAttribute()
        {
            if (this.Name != null)
            {
                this._attributes.Add(AmbientContext.UserPrincipalNameAttributeKey, this.Name);
            }
        }

        #region Borrowed from Nancy.Security.UserIdentityExtensions

        /// <summary>
        /// Determines whether the current principal contains a claim with the specified value
        /// </summary>
        /// <param name="requiredClaim">the claim to match</param>
        /// <returns>true if a matching claim exists, otherwise false</returns>
        public virtual bool HasClaim(string requiredClaim)
        {
            return
                _claims != null
                && _claims.Contains(requiredClaim, StringComparer.OrdinalIgnoreCase);
        }

        /// <summary>
        /// Tests if the user has all of the required claims.
        /// </summary>
        /// <param name="requiredClaims">Claims the user needs to have</param>
        /// <returns>True if the user has all of the required claims, false otherwise</returns>
        public virtual bool HasClaims(IEnumerable<string> requiredClaims)
        {
            return
                _claims != null
                && !requiredClaims.Any(claim => !_claims.Contains(claim, StringComparer.OrdinalIgnoreCase));
        }

        /// <summary>
        /// Tests if the user has at least one of the required claims.
        /// </summary>
        /// <param name="requiredClaims">Claims the user needs to have at least one of</param>
        /// <returns>True if the user has at least one of the required claims, false otherwise</returns>
        public virtual bool HasAnyClaim(IEnumerable<string> requiredClaims)
        {
            return
                    _claims != null
                    && requiredClaims.Any(claim => _claims.Contains(claim, StringComparer.OrdinalIgnoreCase));
        }

        /// <summary>
        /// Tests if the user has claims that satisfy the supplied validation function.
        /// </summary>
        /// <param name="isValid">Validation function to be called with the authenticated users claims</param>
        /// <returns>True if the user does pass the supplied validation function, false otherwise</returns>
        public bool HasValidClaims(Func<IEnumerable<string>, bool> isValid)
        {
            return
                _claims != null
                && isValid(_claims);
        }

        #endregion

        /// <summary>
        /// Get an attribute by name
        /// </summary>
        /// <param name="name">the key of the attribute(s) to find</param>
        /// <returns>The values, if any; a collection of strings.</returns>
        public object GetAttribute(string name)
        {
            if (String.Equals(AmbientContext.ClaimsAttributeKey, name, StringComparison.OrdinalIgnoreCase))
                return Claims;

            if (this._attributes.ContainsKey(name))
                return this.Attributes[name];
            return null;
        }

        /// <summary>
        /// Get an attribute by name and type (simple cast)
        /// </summary>
        /// <typeparam name="T">the type of the desired output</typeparam>
        /// <param name="name">string the name of the attribute</param>
        /// <returns>the object associated with the given name, if any</returns>
        public T GetAttributeAs<T>(string name)
        {
            return (T)this.GetAttribute(name);
        }

        /// <summary>
        /// Get an attribute by name and type (custom cast)
        /// </summary>
        /// <typeparam name="T">the type of the desired output</typeparam>
        /// <param name="name">string the name of the attribute</param>
        /// <param name="converter">a function to allow explicit object casts</param>
        /// <returns>the object associated with the given name, if any</returns>
        public T GetAttributeAs<T>(string name, Func<object, T> converter)
        {
            return converter(this.GetAttribute(name));
        }
    }
}
