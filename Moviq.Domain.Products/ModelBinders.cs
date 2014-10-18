namespace Moviq.Domain.Products
{
    using Grain.DataAccess.Sql;
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;
    using System;
    using System.Data;

    public static class ModelBinders
    {
        public static Func<IDataRecord, IProduct> ProductBinder(IFactory<IProduct> productFactory)
        {
            return r =>
            {
                var product = productFactory.GetInstance();
                    product.Uid = r.GetValueOrDefault<string>("Id");
                    product.Title = r.GetValueOrDefault<string>("Title");
                    product.Description = r.GetValueOrDefault<string>("Description");
                    product.Metadata = r.GetValueOrDefault<string>("Metadata");
                    product.Price = r.GetValueOrDefault<decimal>("Price");
                    product.ThumbnailLink = r.GetValueOrDefault<string>("ThumbnailLink");

                return product;
            };
        }
    }
}
