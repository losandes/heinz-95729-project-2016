namespace Moviq.Domain.Products
{
    using Grain.DataAccess.Sql;
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;
    using System;
    using System.Data;

    public static class ModelBinders
    {
        public static Func<IDataRecord, IProduct> ProductBinder(IFactory<IProductVw> productFactory)
        {
            return r =>
            {
                var _product = productFactory.GetInstance();
                _product.Id = r.GetValueOrDefault<int>("Id");
                _product.Title = r.GetValueOrDefault<string>("Title");
                _product.Description = r.GetValueOrDefault<string>("Description");
                _product.Metadata = r.GetValueOrDefault<string>("Metadata");

                return _product;
            };
        }
    }
}
