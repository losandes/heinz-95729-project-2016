using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Couchbase;
using Couchbase.Extensions;
using Enyim.Caching.Memcached;
using Grain.DataAccess.Sql;
using Moviq.Interfaces.Factories;
using Moviq.Interfaces.Models;
using Moviq.Interfaces.Repositories;
using RestSharp;

namespace Moviq.Domain.Order
{
    public class OrderNoSqlRepository : IRepository<IOrder>
    {
        IFactory<IOrder> orderFactory;
        ICouchbaseClient db;
        ILocale locale;
        IRestClient restClient;
        string searchUrl;
        protected string keyPattern;
        protected string dataType;

        public OrderNoSqlRepository(IFactory<IOrder> orderFactory, ICouchbaseClient db, ILocale locale, IRestClient restClient, string searchUrl)
        {
            this.orderFactory = orderFactory;
            this.db = db;
            this.locale = locale;
            this.dataType = ((IHelpCategorizeNoSqlData)orderFactory.GetInstance())._type;
            this.keyPattern = String.Concat(this.dataType, "::{0}");
            this.restClient = restClient;
            this.searchUrl = searchUrl;
        }

        public IOrder Get(string guid)
        {
            return db.GetJson<Order>(String.Format(keyPattern, guid));
        }

        public IOrder Set(IOrder order)
        {

            if (db.StoreJson(StoreMode.Set, String.Format(keyPattern, order.oid), order))
            {
                return Get(order.oid);
            }
            throw new Exception(locale.ProductSetFailure);
        }

        public IEnumerable<IOrder> List(int take, int skip)
        {
            return null;
        }

        public Task<IEnumerable<IOrder>> Find(string searchBy)
        {
            return null;
        }

        public bool Delete(string id)
        {
            return false;
        }

        public void Dispose()
        {
            
        }
    }
}
