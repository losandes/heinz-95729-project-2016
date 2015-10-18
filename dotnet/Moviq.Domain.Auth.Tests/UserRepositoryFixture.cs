namespace Moviq.Domain.Auth.Tests
{
    using Couchbase;
    using Enyim.Caching.Memcached;
    using Enyim.Caching.Memcached.Results;
    using FluentAssertions;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Moq;
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces.Repositories;
    using Moviq.Locale;
    using Newtonsoft.Json;
    using Ploeh.AutoFixture;
    using Ploeh.AutoFixture.AutoMoq;
    using System.Collections.Generic;

    [TestClass]
    public class UserRepositoryFixture
    {
        public UserRepositoryFixture() 
        { 
            // Fixture setup
            var fixture = new Fixture()
                .Customize(new AutoMoqCustomization());

            mockUser = fixture.Freeze<User>();
            mockUsers = fixture.Freeze<IEnumerable<User>>();
            string mockProductString = JsonConvert.SerializeObject(mockUser);

            ICouchbaseClient db = MakeMockCbClient(mockProductString);
            IFactory<IUser> userFactory = new UserFactory();
            ILocale locale = fixture.Freeze<DefaultLocale>();

            //ICouchbaseClient db, IFactory<IUser> userFactory, ILocale locale
            userRepo = new UserRepository(db, userFactory, locale, "http://localhost:9200/unittests/_search");
        }

        IRepository<IUser> userRepo;
        IUser mockUser;
        IEnumerable<IUser> mockUsers;
        
        private ICouchbaseClient MakeMockCbClient(string mockProductString) //, IDictionary<string, object> mockFindResultSet) 
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

            //service.Setup(cli => 
            //    cli.Get(It.IsAny<IEnumerable<string>>())
            //).Returns(mockFindResultSet);

            return service.Object;
        }

        [TestMethod]
        [TestCategory("UserRepository, when Get is called with a valid Guid, it")]
        public void should_return_a_user_with_the_given_guid() 
        {
            // given
            var expected = userRepo.Set(mockUser);

            // when
            var actual = userRepo.Get(expected.Guid.ToString());

            // then
            actual.Guid.ShouldBeEquivalentTo(expected.Guid);
            actual.Email.ShouldBeEquivalentTo(expected.Email);
            actual.Name.ShouldBeEquivalentTo(expected.Name);
        }

        [TestMethod]
        [TestCategory("UserRepository, when Set is executed with valid data, it")]
        public void should_return_the_user_that_was_created()
        {
            // given
            var expected = mockUser;

            // when
            var actual = userRepo.Set(expected);

            // then
            actual.Guid.ShouldBeEquivalentTo(expected.Guid);
            actual.Email.ShouldBeEquivalentTo(expected.Email);
            actual.Name.ShouldBeEquivalentTo(expected.Name);
        }

    }
}
