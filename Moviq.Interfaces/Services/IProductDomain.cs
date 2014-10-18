namespace Moviq.Interfaces.Services
{
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces.Repositories;

    public interface IProductDomain
    {
        IRepository<IProduct> Repo { get; set; }
    }
}
