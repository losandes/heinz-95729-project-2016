namespace Moviq.Domain.Products.Tests
{
    using Grain.DataAccess.Sql;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces.Repositories;
    using Ploeh.AutoFixture;
    using Ploeh.AutoFixture.AutoMoq;
    using System.Collections.Generic;
    using System.Linq;
    using FluentAssertions;

    [TestClass]
    public class ProductRepositoryTests
    {
        public ProductRepositoryTests() 
        { 
            // Fixture setup
            var fixture = new Fixture()
                .Customize(new AutoMoqCustomization());

            mockProduct = fixture.Freeze<Product>();
            mockProducts = fixture.Freeze<IEnumerable<Product>>();
            IFactory<IProduct> productFactory = new ProductFactory();
            ISqlCommandFactory commandFactory = new SqlCommandFactory();
            ISqlDbInstance db = new MockSqlDbInstance(mockProduct, mockProducts);

            productRepo = new ProductRepository(productFactory, db, commandFactory);
        }

        IRepository<IProduct> productRepo;
        IProduct mockProduct;
        IEnumerable<IProduct> mockProducts;

        [TestMethod]
        [TestCategory("ProductRepository, when Get is executed with a valid Id")]
        public void should_return_a_product_with_the_given_id() 
        {
            // given
            var expected = mockProduct;

            // when
            var actual = productRepo.Get(expected.Id);

            // then
            actual.Id.ShouldBeEquivalentTo(expected.Id);
            actual.Title.ShouldBeEquivalentTo(expected.Title);
            actual.Description.ShouldBeEquivalentTo(expected.Description);
        }

        [TestMethod]
        [TestCategory("ProductRepository, when Set is executed with valid data")]
        public void should_return_the_product_that_was_created()
        {
            // given
            var expected = mockProduct;

            // when
            var actual = productRepo.Set(expected);

            // then
            actual.Id.ShouldBeEquivalentTo(expected.Id);
            actual.Title.ShouldBeEquivalentTo(expected.Title);
            actual.Description.ShouldBeEquivalentTo(expected.Description);
        }

        [TestMethod]
        [TestCategory("ProductRepository, when List is executed")]
        public void should_return_a_list_of_products()
        {
            // given
            var expected = mockProducts;

            // when
            var actual = productRepo.List(20, 0);

            // then
            actual.Count().Should().BeGreaterThan(2);
            actual.First().Id.ShouldBeEquivalentTo(expected.First().Id);
            actual.First().Title.ShouldBeEquivalentTo(expected.First().Title);
            actual.First().Description.ShouldBeEquivalentTo(expected.First().Description);
        }

        [TestMethod]
        [TestCategory("ProductRepository, when Find is executed with valid search criteria")]
        public void should_return_products_that_meet_the_search_criteria()
        {
            // given
            var expected = mockProducts;
            var searchTerm = mockProducts.First().Title;

            // when
            var actual = productRepo.Find(searchTerm);

            // then
            actual.Count().Should().BeGreaterThan(2);
            actual.First().Id.ShouldBeEquivalentTo(expected.First().Id);
            actual.First().Title.ShouldBeEquivalentTo(expected.First().Title);
            actual.First().Description.ShouldBeEquivalentTo(expected.First().Description);
        }
    }
}
