namespace Moviq.Interfaces.Models
{
    using System.Collections.Generic;

    public interface IBook : IProduct
    {
        ICollection<IAuthor> Authors { get; set; }
    }
}