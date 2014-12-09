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

namespace Moviq.Domain.Cart.Tests
{
    [TestClass]
    public class CartNoSqlRepositoryFixture
    {
        IRepository<ICart> cartRepo;
        ICart mockCart;
        IEnumerable<ICart> mockCarts;
        public CartNoSqlRepositoryFixture()
        {
            IFactory<ICart> cartFactory = new CartFactory();

            // Fixture setup
            var fixture = new Fixture()
                .Customize(new AutoMoqCustomization());

            mockCart = fixture.Freeze<CartUID>();
            string mockCartString = JsonConvert.SerializeObject(mockCart);
            IDictionary<string, object> mockFindResultSet = new Dictionary<string, object>(); // Not required


            ICouchbaseClient db = MakeMockCbClient(mockCartString, mockFindResultSet);
            ILocale locale = fixture.Freeze<DefaultLocale>();
            IRestClient restClient = MakeMockRestClient();

            cartRepo = new CartNoSqlRepository(cartFactory, db, locale, restClient, "http://localhost:9200/unittests/_search");
        }

        private ICouchbaseClient MakeMockCbClient(string mockProductString, IDictionary<string, object> mockFindResultSet)
        {
            var service = new Mock<ICouchbaseClient>();

            service.Setup(cli =>
                cli.Get<string>(It.IsAny<string>())
            ).Returns(mockProductString);

            service.Setup(cli =>
                cli.ExecuteStore(StoreMode.Set, It.IsAny<string>(), It.IsAny<object>())
            ).Returns(new StoreOperationResult
            {
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
                    new RestResponse
                    {
                        Content = "{\"took\":5,\"timed_out\":false,\"_shards\":{\"total\":5,\"successful\":5,\"failed\":0},\"hits\":{\"total\":4,\"max_score\":0.9581257,\"hits\":[{\"_index\":\"unittests\",\"_type\":\"couchbaseDocument\",\"_id\":\"product::hitchhikers-guide-galaxy\",\"_score\":0.9581257, \"_source\" : {\"meta\":{\"rev\":\"19-00000669babcd3260000000000000112\",\"flags\":274,\"expiration\":0,\"id\":\"product::hitchhikers-guide-galaxy\"}}},{\"_index\":\"unittests\",\"_type\":\"couchbaseDocument\",\"_id\":\"product::restaurant-at-end-universe\",\"_score\":0.15583158, \"_source\" : {\"meta\":{\"rev\":\"19-00000669bcac710c0000000000000112\",\"flags\":274,\"expiration\":0,\"id\":\"product::restaurant-at-end-universe\"}}},{\"_index\":\"unittests\",\"_type\":\"couchbaseDocument\",\"_id\":\"product::universe-everything\",\"_score\":0.13290596, \"_source\" : {\"meta\":{\"rev\":\"19-00000669bca4b6700000000000000112\",\"flags\":274,\"expiration\":0,\"id\":\"product::universe-everything\"}}},{\"_index\":\"unittests\",\"_type\":\"couchbaseDocument\",\"_id\":\"product::dirk-gentlys-detective-agency\",\"_score\":0.092983946, \"_source\" : {\"meta\":{\"rev\":\"19-00000669bcb2c5e00000000000000112\",\"flags\":274,\"expiration\":0,\"id\":\"product::dirk-gentlys-detective-agency\"}}}]}}"
                    }
                )
            );
        }

        [TestMethod]
        [TestCategory("CartNoSqlRepository, when Set is executed with valid data, it")]
        public void should_return_the_cart_that_was_created()
        {
            // given
            var expected = mockCart;

            // when
            var actual = cartRepo.Set(expected);

            // then
            actual.guid.ShouldBeEquivalentTo(expected.guid);
            actual.prodQuantity.ShouldBeEquivalentTo(expected.prodQuantity);
        }
    }
}
