namespace Moviq.Domain.Products.Tests
{
    using Couchbase;
    using FluentAssertions;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Moviq.Domain.Products.Tests.Mocks;
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces.Repositories;
    using Moviq.Locale;
    using Ploeh.AutoFixture;
    using Ploeh.AutoFixture.AutoMoq;
    using RestSharp;
    using System.Collections.Generic;
    using System.Linq;

    [TestClass]
    public class ProductNoSqlRepositoryRegressionFixture
    {
        public ProductNoSqlRepositoryRegressionFixture() 
        { 
            // Fixture setup
            var fixture = new Fixture()
                .Customize(new AutoMoqCustomization());

            mockProduct = fixture.Freeze<Product>();
            mockProducts = fixture.Freeze<IEnumerable<Product>>();
            IFactory<IProduct> productFactory = new ProductFactory();
            ICouchbaseClient db = new CouchbaseClient();
            ILocale locale = fixture.Freeze<DefaultLocale>();
            IRestClient restClient = new RestClient();

            productRepo = new ProductNoSqlRepository(productFactory, db, locale, restClient, 
                "http://localhost:9200/unittests/_search");
        }

        IRepository<IProduct> productRepo;
        IProduct mockProduct;
        IEnumerable<IProduct> mockProducts;

        [TestMethod]
        [TestCategory("ProductNoSqlRepository (Regression), when Set is executed with valid data, it")]
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
        [TestCategory("ProductNoSqlRepository (Regression), when Get is executed with a valid Id, it")]
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
        [TestCategory("ProductNoSqlRepository (Regression), when Find is executed with valid search criteria, it")]
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
        [TestCategory("ProductNoSqlRepository (Regression), when Find is executed with advanced search criteria, it")]
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
