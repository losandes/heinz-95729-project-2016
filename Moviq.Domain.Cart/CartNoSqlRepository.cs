namespace Moviq.Domain.Cart
{
    using Couchbase;
    using Couchbase.Extensions;
    using Enyim.Caching.Memcached;
    using Grain.DataAccess.Sql;
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces.Repositories;
    using Newtonsoft.Json;
    using RestSharp;
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;
    
    public class CartNoSqlRepository : IRepository<ICart>
    {
        protected string keyPattern;
        protected string dataType;

        public CartNoSqlRepository(IFactory<ICart> cartFactory, ICouchbaseClient db, ILocale locale, IRestClient restClient, string searchUrl)
        {
            this.cartFactory = cartFactory;
            this.db = db;
            this.locale = locale;
            this.dataType = ((IHelpCategorizeNoSqlData)cartFactory.GetInstance())._type;
            this.keyPattern = String.Concat(this.dataType, "::{0}");
            this.restClient = restClient;
            this.searchUrl = searchUrl;
        }

        IFactory<ICart> cartFactory;
        ICouchbaseClient db;
        ILocale locale;
        IRestClient restClient;
        string searchUrl;
        string query = "{ \"query\": { \"query_string\": { \"query_string\": { \"query\": \"{0}\" } } } }";

        public ICart Get(string guid)
        {
            if (db.KeyExists(String.Format(keyPattern, guid)))
            {
                return db.GetJson<ICart>(String.Format(keyPattern, guid));
            }
            else
            {
                return new Cart(new Guid(guid));
            }           
        }

        private IEnumerable<ICart> Get(IEnumerable<string> keys)
        {
            return null;
        }

        public ICart Set(ICart cart)
        {
            if (cart.guid != Guid.Empty)
            {
                if (db.StoreJson(StoreMode.Replace, String.Format(keyPattern, cart.guid.ToString()), cart))
                {
                    return Get(cart.guid.ToString());
                }
            }
            //else
            //{
            //    if (db.StoreJson(StoreMode.Set, String.Format(keyPattern, cart.guid), cart))
            //    {
            //        return Get(cart.guid.ToString());
            //    }
            //}
            //CHECK
            throw new Exception(locale.ProductSetFailure);
        }

        public IEnumerable<ICart> List(int take, int skip)
        {
            return null;
        }

        public async Task<IEnumerable<ICart>> Find(string guid)
        {
            return null;
        }

        public bool Delete(string guid)
        {
            return false;
        }

        private bool KeyExists(string uid)
        {
            return db.KeyExists(String.Format(keyPattern, uid));
        }

        /// <summary>
        /// Make the RestRequest object and set appropriate headers and params
        /// </summary>
        /// <param name="url">the url to be used for search</param>
        /// <returns>A RestRequest object</returns>
        private RestRequest BuildSearchPostRequest(string searchFor)
        {
            var request = new RestRequest(searchUrl, Method.POST);
            request.RequestFormat = DataFormat.Json;
            request.AddBody(new
            {
                query = new
                {
                    query_string = new
                    {
                        query_string = new
                        {
                            query = searchFor
                        }
                    }
                }
            });

            return request;

            //var request = new RestRequest(searchUrl, Method.GET);
            //request.AddParameter("q", searchFor);

            //return request;
        }

        public void Dispose()
        {
            // don't dispose the db - it's a singleton
        }

    }
}
