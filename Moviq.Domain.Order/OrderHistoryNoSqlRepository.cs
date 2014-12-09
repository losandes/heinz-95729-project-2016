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
    public class OrderHistoryNoSqlRepository : IRepository<IOrderHistory>
    {
        IFactory<IOrderHistory> orderHistoryFactory;
        ICouchbaseClient db;
        ILocale locale;
        IRestClient restClient;
        string searchUrl;
        protected string keyPattern;
        protected string dataType;

        public OrderHistoryNoSqlRepository(IFactory<IOrderHistory> orderHistoryFactory, ICouchbaseClient db, ILocale locale, IRestClient restClient, string searchUrl)
        {
            this.orderHistoryFactory = orderHistoryFactory;
            this.db = db;
            this.locale = locale;
            this.dataType = ((IHelpCategorizeNoSqlData)orderHistoryFactory.GetInstance())._type;
            this.keyPattern = String.Concat(this.dataType, "::{0}");
            this.restClient = restClient;
            this.searchUrl = searchUrl;
        }

        public IOrderHistory Get(string guid)
        {
            return db.GetJson<OrderHistory>(String.Format(keyPattern, guid));
        }

        public IOrderHistory Set(IOrderHistory orderHistory)
        {
            if (db.StoreJson(StoreMode.Set, String.Format(keyPattern, orderHistory.guid), orderHistory))
            {
                return Get(orderHistory.guid.ToString());
            }
            throw new Exception(locale.ProductSetFailure);
        }

        public IEnumerable<IOrderHistory> List(int take, int skip)
        {
            return null;
        }

        public Task<IEnumerable<IOrderHistory>> Find(string searchBy)
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
