namespace Moviq.Domain.Products
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

    public class ProductNoSqlRepository : IRepository<IProduct>
    {
        protected string keyPattern;
        protected string dataType;

        public ProductNoSqlRepository(IFactory<IProduct> productFactory, ICouchbaseClient db, ILocale locale, IRestClient restClient, string searchUrl)
        {
            this.productFactory = productFactory;
            this.db = db;
            this.locale = locale;
            this.dataType = ((IHelpCategorizeNoSqlData)productFactory.GetInstance())._type;
            this.keyPattern = String.Concat(this.dataType, "::{0}");
            this.restClient = restClient;
            this.searchUrl = searchUrl;
        }

        IFactory<IProduct> productFactory;
        ICouchbaseClient db;
        ILocale locale;
        IRestClient restClient;
        string searchUrl;
        string query = "{ \"query\": { \"query_string\": { \"query_string\": { \"query\": \"{0}\" } } } }";

        public IProduct Get(string uid)
        {
            return db.GetJson<Product>(String.Format(keyPattern, uid.ToString()));
        }

        private IEnumerable<IProduct> Get(IEnumerable<string> keys) 
        {
            if (!keys.Any())
                yield break;

            var _results = db.Get(keys).Where(o => o.Value != null).Select(o => o.Value);

            if (!_results.Any())
                yield break;

            foreach (var o in _results)
                yield return JsonConvert.DeserializeObject<Product>(o.ToString());
        }

        public IProduct Set(IProduct product)
        {
            if (db.StoreJson(StoreMode.Set, String.Format(keyPattern, product.Uid), product))
            {
                return Get(product.Uid);
            }

            throw new Exception(locale.ProductSetFailure);
        }

        public IEnumerable<IProduct> List(int take, int skip)
        {
            // TODO: We are breaking Liskov Subsitution by not implementing this method!

            // http://localhost:8092/moviq/_design/dev_books/_view/books?stale=false&connection_timeout=60000&limit=20&skip=0
            throw new Exception(locale.LiskovSubstitutionInfraction);
        }

        public async Task<IEnumerable<IProduct>> Find(string searchFor)
        {
            // alternatively we could use the elasticsearch.NET option
            // http://www.elasticsearch.org/guide/en/elasticsearch/client/net-api/current/_elasticsearch_net.html

            var response = await restClient.ExecutePostTaskAsync(BuildSearchPostRequest(searchFor));
            var result = JsonConvert.DeserializeObject<NoSqlSearchResult>(response.Content);

            if (result.hits == null || result.hits.hits == null || result.hits.hits.Count < 1)
            {
                return null;
            }
            
            List<string> keys = new List<string> { };

            foreach (var item in result.hits.hits)
            {
                keys.Add(item._id);
            }

            return Get(keys);
        }

        public bool Delete(string uid)
        {
            return db.Remove(String.Format(keyPattern, uid));
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
