namespace Moviq.Interfaces.Models
{
    using System;
    using System.Collections.Generic;
    using System.Security.Principal;

    public interface ICustomClaimsPrincipal : IPrincipal
    {
        /// <summary>
        /// Returns the IIdentity as ICustomClaimsIdentity
        /// </summary>
        ICustomClaimsIdentity ClaimsIdentity { get; }
    }

    public interface ICustomClaimsIdentity : IIdentity
    {
        IEnumerable<string> Claims { get; }
        IDictionary<string, object> Attributes { get; }

        ICustomClaimsIdentity Clone();
        bool AddClaim(string claim);
        void AddClaims(IEnumerable<string> claims);
        bool TryRemoveClaim(string claim);
        void RemoveClaim(string claim);
        bool AddAttribute(string name, object value);
        void AddAttributes(Dictionary<string, object> attributes);
        bool RemoveAttribute(string name);
        bool SetAttribute(string name, object value);

        /// <summary>
        /// Determines whether the current principal contains a claim with the specified value
        /// </summary>
        /// <param name="requiredClaim">the claim to match</param>
        /// <returns>true if a matching claim exists, otherwise false</returns>
        bool HasClaim(string requiredClaim);

        /// <summary>
        /// Tests if the user has all of the required claims.
        /// </summary>
        /// <param name="requiredClaims">Claims the user needs to have</param>
        /// <returns>True if the user has all of the required claims, false otherwise</returns>
        bool HasClaims(IEnumerable<string> requiredClaims);

        /// <summary>
        /// Tests if the user has at least one of the required claims.
        /// </summary>
        /// <param name="requiredClaims">Claims the user needs to have at least one of</param>
        /// <returns>True if the user has at least one of the required claims, false otherwise</returns>
        bool HasAnyClaim(IEnumerable<string> requiredClaims);

        /// <summary>
        /// Tests if the user has claims that satisfy the supplied validation function.
        /// </summary>
        /// <param name="isValid">Validation function to be called with the authenticated users claims</param>
        /// <returns>True if the user does pass the supplied validation function, false otherwise</returns>
        bool HasValidClaims(Func<IEnumerable<string>, bool> isValid);

        /// <summary>
        /// Get an attribute by name
        /// </summary>
        /// <param name="name">the key of the attribute(s) to find</param>
        /// <returns>The values, if any; a collection of strings.</returns>
        object GetAttribute(string name);

        /// <summary>
        /// Get an attribute by name and type (simple cast)
        /// </summary>
        /// <typeparam name="T">the type of the desired output</typeparam>
        /// <param name="name">string the name of the attribute</param>
        /// <returns>the object associated with the given name, if any</returns>
        T GetAttributeAs<T>(string name);

        /// <summary>
        /// Get an attribute by name and type (custom cast)
        /// </summary>
        /// <typeparam name="T">the type of the desired output</typeparam>
        /// <param name="name">string the name of the attribute</param>
        /// <param name="converter">a function to allow explicit object casts</param>
        /// <returns>the object associated with the given name, if any</returns>
        T GetAttributeAs<T>(string name, Func<object, T> converter);
    }
}
