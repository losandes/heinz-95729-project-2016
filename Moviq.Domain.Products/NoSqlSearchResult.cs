using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moviq.Domain.Products
{
    public class NoSqlSearchResult
    {
        public int took { get; set; }
        public bool timed_out { get; set; }
        public NoSqlSearchResultShards _shards { get; set; }
        public NoSqlSearchResultHits hits { get; set; }
    }

    public class NoSqlSearchResultShards 
    {
        public int total { get; set; }
        public int successful { get; set; }
        public int failed { get; set; }
    }

    public class NoSqlSearchResultHits 
    {
        public int total { get; set; }
        public decimal? max_score { get; set; }
        public List<NoSqlSearchResultHit> hits { get; set; }
    }

    public class NoSqlSearchResultHit 
    {
        public string _index { get; set; }
        public string _type { get; set; }
        public string _id { get; set; }
        public decimal _score { get; set; }
        public object _source { get; set; }

        //{
        //  "_index": "unittests",
        //  "_type": "couchbaseDocument",
        //  "_id": "product::Hitchhikers-Guide-Galaxy",
        //  "_score": 0.22380966,
        //  "_source": {
        //    "meta": {
        //      "rev": "2-00001e71d8f40e5f0000000000000112",
        //      "flags": 274,
        //      "expiration": 0,
        //      "id": "product::Hitchhikers-Guide-Galaxy"
        //    }
        //  }
        //}
    }
}
