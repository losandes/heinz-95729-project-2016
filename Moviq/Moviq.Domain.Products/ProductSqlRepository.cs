namespace Moviq.Domain.Products
{
    using Grain.DataAccess.Sql;
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces.Repositories;
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Threading.Tasks;

    public class ProductSqlRepository : IRepository<IProduct>
    {
        public ProductSqlRepository(IFactory<IProduct> productFactory, ISqlDbInstance db, ISqlCommandFactory commandFactory)
        {
            this.productFactory = productFactory;
            this.db = db;
            this.commandFactory = commandFactory;
        }

        IFactory<IProduct> productFactory;
        ISqlDbInstance db;
        ISqlCommandFactory commandFactory;

        public IProduct Get(string id)
        {
            var _command = commandFactory.MakeProcCommand("dbo.Products_Get",
                new TupleList<string, SqlDbType, object> {
                    { "Id", SqlDbType.NVarChar, id }
                });
            return db.ExecuteAsSingle<IProduct>(_command, ModelBinders.ProductBinder(productFactory));
        }

        public IProduct Set(IProduct product)
        {
            var _command = commandFactory.MakeProcCommand("dbo.Products_Set",
                new TupleList<string, SqlDbType, object> {
                    { "id", SqlDbType.NVarChar, product.Uid },
                    { "title", SqlDbType.NVarChar, product.Title },
                    { "description", SqlDbType.NVarChar, product.Description },
                    { "metadata", SqlDbType.NVarChar, product.Metadata }
                });
            return db.ExecuteAsSingle<IProduct>(_command, ModelBinders.ProductBinder(productFactory));
        }

        public IEnumerable<IProduct> List(int take, int skip)
        {
            var _command = commandFactory.MakeProcCommand("dbo.Products_List",
                new TupleList<string, SqlDbType, object> {
                    { "take", SqlDbType.Int, take },
                    { "skip", SqlDbType.Int, skip }
                });
            return db.ExecuteAs<IProduct>(_command, ModelBinders.ProductBinder(productFactory));
        }

        public Task<IEnumerable<IProduct>> Find(string searchBy)
        {
            return Task.Run(() =>
            {
                var _command = commandFactory.MakeProcCommand("dbo.Products_Find",
                    new TupleList<string, SqlDbType, object> {
                    { "searchBy", SqlDbType.NVarChar, searchBy }
                });
                return db.ExecuteAs<IProduct>(_command, ModelBinders.ProductBinder(productFactory));
            });
        }

        public bool Delete(string id)
        {
            var _command = commandFactory.MakeProcCommand("dbo.Products_Delete",
                new TupleList<string, SqlDbType, object> {
                    { "Id", SqlDbType.NVarChar, id }
                });
            return db.ExecuteAsSingle<IProduct>(_command, ModelBinders.ProductBinder(productFactory)) != null;
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}
