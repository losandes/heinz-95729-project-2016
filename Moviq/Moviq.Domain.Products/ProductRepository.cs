namespace Moviq.Domain.Products
{
    using Grain.DataAccess.Sql;
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces.Repositories;
    using System;
    using System.Collections.Generic;
    using System.Data;

    public class ProductRepository : IRepository<IProduct>
    {
        public ProductRepository(IFactory<IProduct> productFactory, ISqlDbInstance db, ISqlCommandFactory commandFactory)
        {
            this.productFactory = productFactory;
            this.db = db;
            this.commandFactory = commandFactory;
        }

        IFactory<IProduct> productFactory;
        ISqlDbInstance db;
        ISqlCommandFactory commandFactory;

        public IProduct Get(int id)
        {
            var _command = commandFactory.MakeProcCommand("dbo.getProduct",
                new TupleList<string, SqlDbType, object> {
                    { "Id", SqlDbType.Int, id }
                });
            return db.ExecuteAsSingle<IProduct>(_command, ModelBinders.ProductBinder(productFactory));
        }

        public IProduct Set(IProduct movie)
        {
            throw new NotImplementedException();
        }

        public ICollection<IProduct> List(int take, int skip)
        {
            throw new NotImplementedException();
        }

        public ICollection<IProduct> Find(string searchBy)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}
