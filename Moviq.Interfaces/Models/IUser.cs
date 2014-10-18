namespace Moviq.Interfaces.Models
{
    public interface IUser
    {
        int Id { get; set; }
        string Name { get; set; }
        string Email { get; set; }
    }

    public interface IPrincipal : IUser 
    {
        bool Active { get; set; }
    }
}   
