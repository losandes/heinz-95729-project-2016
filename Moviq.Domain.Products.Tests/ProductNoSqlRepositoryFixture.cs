namespace Moviq.Domain.Products.Tests
{
    using Couchbase;
    using Enyim.Caching.Memcached;
    using Enyim.Caching.Memcached.Results;
    using FluentAssertions;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Moq;
    using Moviq.Domain.Products.Tests.Mocks;
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces.Repositories;
    using Moviq.Locale;
    using Newtonsoft.Json;
    using Ploeh.AutoFixture;
    using Ploeh.AutoFixture.AutoMoq;
    using RestSharp;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    [TestClass]
    public class ProductNoSqlRepositoryFixture
    {
        public ProductNoSqlRepositoryFixture() 
        { 
            // Fixture setup
            var fixture = new Fixture()
                .Customize(new AutoMoqCustomization());

            mockProduct = fixture.Freeze<Product>();
            mockProducts = fixture.Freeze<IEnumerable<Product>>();
            string mockProductString = JsonConvert.SerializeObject(mockProduct);
            IDictionary<string, object> mockFindResultSet = new Dictionary<string, object>();

            foreach (var product in MockProducts.MockBooks)
            {
                mockFindResultSet.Add("product::" + product.Uid, 
                    JsonConvert.SerializeObject(product));
            }

            IFactory<IProduct> productFactory = new ProductFactory();
            ICouchbaseClient db = MakeMockCbClient(mockProductString, mockFindResultSet);
            ILocale locale = fixture.Freeze<DefaultLocale>();
            IRestClient restClient = MakeMockRestClient();

            productRepo = new ProductNoSqlRepository(productFactory, db, locale, restClient, 
                "http://localhost:9200/unittests/_search");
        }

        IRepository<IProduct> productRepo;
        IProduct mockProduct;
        IEnumerable<IProduct> mockProducts;
        
        private ICouchbaseClient MakeMockCbClient(string mockProductString, IDictionary<string, object> mockFindResultSet) 
        {
            var service = new Mock<ICouchbaseClient>();

            service.Setup(cli =>
                cli.Get<string>(It.IsAny<string>())    
            ).Returns(mockProductString);

            service.Setup(cli =>
                cli.ExecuteStore(StoreMode.Set, It.IsAny<string>(), It.IsAny<object>())
            ).Returns(new StoreOperationResult { 
                Success = true
            });

            service.Setup(cli => 
                cli.Get(It.IsAny<IEnumerable<string>>())
            ).Returns(mockFindResultSet);

            return service.Object;
        }

        private IRestClient MakeMockRestClient() 
        {
            return Mock.Of<IRestClient>(cli =>
                cli.ExecutePostTaskAsync(It.IsAny<IRestRequest>()) == Task.FromResult<IRestResponse>(
                    new RestResponse {
                        Content = "{\"took\":5,\"timed_out\":false,\"_shards\":{\"total\":5,\"successful\":5,\"failed\":0},\"hits\":{\"total\":4,\"max_score\":0.9581257,\"hits\":[{\"_index\":\"unittests\",\"_type\":\"couchbaseDocument\",\"_id\":\"product::hitchhikers-guide-galaxy\",\"_score\":0.9581257, \"_source\" : {\"meta\":{\"rev\":\"19-00000669babcd3260000000000000112\",\"flags\":274,\"expiration\":0,\"id\":\"product::hitchhikers-guide-galaxy\"}}},{\"_index\":\"unittests\",\"_type\":\"couchbaseDocument\",\"_id\":\"product::restaurant-at-end-universe\",\"_score\":0.15583158, \"_source\" : {\"meta\":{\"rev\":\"19-00000669bcac710c0000000000000112\",\"flags\":274,\"expiration\":0,\"id\":\"product::restaurant-at-end-universe\"}}},{\"_index\":\"unittests\",\"_type\":\"couchbaseDocument\",\"_id\":\"product::universe-everything\",\"_score\":0.13290596, \"_source\" : {\"meta\":{\"rev\":\"19-00000669bca4b6700000000000000112\",\"flags\":274,\"expiration\":0,\"id\":\"product::universe-everything\"}}},{\"_index\":\"unittests\",\"_type\":\"couchbaseDocument\",\"_id\":\"product::dirk-gentlys-detective-agency\",\"_score\":0.092983946, \"_source\" : {\"meta\":{\"rev\":\"19-00000669bcb2c5e00000000000000112\",\"flags\":274,\"expiration\":0,\"id\":\"product::dirk-gentlys-detective-agency\"}}}]}}"
                    }
                )
            );
        }

        [TestMethod]
        [TestCategory("ProductNoSqlRepository, when Set is executed with valid data, it")]
        public void should_return_the_product_that_was_created()
        {
            // given
            var expected = mockProduct;

            // when
            var actual = productRepo.Set(expected);

            // then
            actual.Uid.ShouldBeEquivalentTo(expected.Uid);
            actual.Title.ShouldBeEquivalentTo(expected.Title);
            actual.Description.ShouldBeEquivalentTo(expected.Description);
        }

        [TestMethod]
        [TestCategory("ProductNoSqlRepository, when Get is executed with a valid Id, it")]
        public void should_return_a_product_with_the_given_id() 
        {
            // given
            var expected = productRepo.Set(mockProduct);

            // when
            var actual = productRepo.Get(expected.Uid);

            // then
            actual.Uid.ShouldBeEquivalentTo(expected.Uid);
            actual.Title.ShouldBeEquivalentTo(expected.Title);
            actual.Description.ShouldBeEquivalentTo(expected.Description);
        }

        //[TestMethod]
        //[TestCategory("ProductNoSqlRepository, when List is executed")]
        public void should_return_a_list_of_products()
        {
            // given
            var expected = new List<IProduct>();

            foreach (var product in mockProducts) 
            {
                expected.Add(productRepo.Set(product));
            }

            // when
            var actual = productRepo.List(20, 0);

            // then
            actual.Count().Should().BeGreaterThan(2);
            actual.First().Uid.ShouldBeEquivalentTo(expected.First().Uid);
            actual.First().Title.ShouldBeEquivalentTo(expected.First().Title);
            actual.First().Description.ShouldBeEquivalentTo(expected.First().Description);
        }

        [TestMethod]
        [TestCategory("ProductNoSqlRepository, when Find is executed with valid search criteria, it")]
        public void should_return_products_that_meet_the_search_criteria()
        {
            // given
            var expected = MockProducts.MockBooks;
            var searchTerm = expected.First().Title;
            foreach (var product in expected)
            {
                productRepo.Set(product);
            }

            // when (BLOCKING)
            var actual = productRepo.Find(searchTerm).Result;

            // then
            actual.Count().Should().BeGreaterThan(2);
            actual.First().Uid.ShouldBeEquivalentTo(expected.First().Uid);
            actual.First().Title.ShouldBeEquivalentTo(expected.First().Title);
            actual.First().Description.ShouldBeEquivalentTo(expected.First().Description);
        }

        [TestMethod]
        [TestCategory("ProductNoSqlRepository, when Find is executed with advanced search criteria, it")]
        public void should_return_products_that_meet_the_advanced_search_criteria()
        {
            // given
            var expected = MockProducts.MockBooks;
            var searchTerm = "title: " + expected.First().Title;
            foreach (var product in expected)
            {
                productRepo.Set(product);
            }

            // when (BLOCKING)
            var actual = productRepo.Find(searchTerm).Result;

            // then
            actual.Count().Should().BeGreaterThan(2);
            actual.First().Uid.ShouldBeEquivalentTo(expected.First().Uid);
            actual.First().Title.ShouldBeEquivalentTo(expected.First().Title);
            actual.First().Description.ShouldBeEquivalentTo(expected.First().Description);
        }
    }
}
