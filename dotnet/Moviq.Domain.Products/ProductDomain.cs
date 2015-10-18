namespace Moviq.Domain.Products
{
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces.Repositories;
    using Moviq.Interfaces.Services;

    public class ProductDomain : IProductDomain
    {
        public ProductDomain(IRepository<IProduct> repo)
        {
            this.Repo = repo;
        }

        public IRepository<IProduct> Repo { get; set; }
    }
}
