namespace Moviq.Domain.Auth
{
    using Couchbase;
    using Couchbase.Extensions;
    using Enyim.Caching.Memcached;
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces.Repositories;
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class UserRepository : IRepository<IUser>, IUserRepository
    {
        public UserRepository(ICouchbaseClient db, IFactory<IUser> userFactory, ILocale locale, string searchUrl) 
        {
            this.db = db;
            this.dataType = ((IHelpCategorizeNoSqlData)userFactory.GetInstance())._type;
            this.keyPattern = String.Concat(this.dataType, "::{0}");
            this.locale = locale;
            this.searchUrl = searchUrl;
        }

        string dataType;
        string keyPattern;
        ICouchbaseClient db;
        ILocale locale;
        string searchUrl;

        public IUser Get(string guid)
        {
            return db.GetJson<User>(String.Format(keyPattern, guid.ToString()));
        }

        public IUser GetByUsername(string username) 
        {
            var key = db.Get(String.Format(keyPattern, username)).ToString();
            key = key.Replace("\"", "");
            return db.GetJson<User>(key);
        }

        private IEnumerable<IUser> Get(IEnumerable<string> keys)
        {
            if (!keys.Any())
                yield break;

            var _results = db.Get(keys).Where(o => o.Value != null).Select(o => o.Value);

            if (!_results.Any())
                yield break;

            foreach (var o in _results)
                yield return JsonConvert.DeserializeObject<User>(o.ToString());
        }

        public IUser Set(IUser user)
        {
            var userExists = UserExists(user.UserName);

            if (user.Guid == Guid.Empty) 
            {
                user.Guid = Guid.NewGuid();
            }

            var mainKey = String.Format(keyPattern, user.Guid.ToString());

            if (userExists && SetUser(user, mainKey))
            {
                return Get(user.Guid.ToString());
            }
            else if (!userExists && SetUser(user, mainKey) && SetUserId(user, mainKey))
            {
                return Get(user.Guid.ToString());           
            }

            throw new Exception(locale.UserSetFailure);
        }

        private bool SetUser(IUser user, string mainKey) 
        {
            var lookupByUserName = String.Format(keyPattern, user.UserName);

            return db.StoreJson(StoreMode.Set, lookupByUserName, mainKey)
                && db.StoreJson(StoreMode.Set, mainKey, user);
        }

        private bool SetUserId(IUser user, string mainKey) 
        {
            var countKey = String.Format(keyPattern, "count");
            var id = db.Increment(countKey, 1, 1);
            var lookupById = String.Format(keyPattern, id.ToString());

            return db.StoreJson(StoreMode.Set, lookupById, mainKey);
        }

        public bool UserExists(string username) 
        {
            var lookupByUserName = String.Format(keyPattern, username);
            return db.KeyExists(lookupByUserName);
        }

        public IEnumerable<IUser> List(int take, int skip)
        {
            // TODO: We are breaking Liskov Subsitution by not implementing this method!

            // http://localhost:8092/moviq/_design/dev_books/_view/books?stale=false&connection_timeout=60000&limit=20&skip=0
            throw new Exception(locale.LiskovSubstitutionInfraction);
        }

        public Task<IEnumerable<IUser>> Find(string searchBy)
        {
            // TODO: We are breaking Liskov Subsitution by not implementing this method!

            // http://localhost:8092/moviq/_design/dev_books/_view/books?stale=false&connection_timeout=60000&limit=20&skip=0
            throw new Exception(locale.LiskovSubstitutionInfraction);
        }

        public bool Delete(string guid)
        {
            return db.Remove(String.Format(keyPattern, guid));
        }

        public void Dispose()
        {
            // don't dispose the db - it's a singleton
        }
    }
}
