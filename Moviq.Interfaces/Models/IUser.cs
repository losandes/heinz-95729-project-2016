namespace Moviq.Interfaces.Models
{
    using System;
    using System.Collections.Generic;
    using System.Security.Principal;

    public interface IUser
    {
        Guid Guid { get; set; }
        string Name { get; set; }
        string Email { get; set; }
        string UserName { get; }
        string Password { get; set; }
    }
}   
