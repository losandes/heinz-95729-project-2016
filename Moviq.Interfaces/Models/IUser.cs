namespace Moviq.Interfaces.Models
{
    using System;
    using System.Collections.Generic;

    public interface IUser
    {
        Guid Guid { get; set; }
        string Name { get; set; }
        string Email { get; set; }
        string UserName { get; }
        string Password { get; set; }
    }

    public interface IPrincipal : IUser 
    {
        bool Active { get; set; }
    }
}   
