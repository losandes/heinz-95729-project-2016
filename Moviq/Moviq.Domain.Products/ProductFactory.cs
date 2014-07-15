namespace Moviq.Domain.Products
{
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;

    public class ProductFactory : IFactory<IProductVw>
    {
        public IProductVw GetInstance()
        {
            return new Product() as IProductVw;
        }
    }
}
