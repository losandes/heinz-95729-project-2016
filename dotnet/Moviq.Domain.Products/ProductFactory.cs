namespace Moviq.Domain.Products
{
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;

    public class ProductFactory : IFactory<IProduct>
    {
        public IProduct GetInstance()
        {
            return new Product() as IProduct;
        }
    }
}
