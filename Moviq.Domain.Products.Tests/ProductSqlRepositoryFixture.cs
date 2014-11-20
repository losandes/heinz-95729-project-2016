namespace Moviq.Domain.Products.Tests
{
    using FluentAssertions;
    using Grain.DataAccess.Sql;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces.Repositories;
    using Ploeh.AutoFixture;
    using Ploeh.AutoFixture.AutoMoq;
    using System.Collections.Generic;
    using System.Linq;

    [TestClass]
    public class ProductSqlRepositoryFixure
    {
        public ProductSqlRepositoryFixure() 
        { 
            // Fixture setup
            var fixture = new Fixture()
                .Customize(new AutoMoqCustomization());

            mockProduct = fixture.Freeze<Product>();
            mockProducts = fixture.Freeze<IEnumerable<Product>>();
            IFactory<IProduct> productFactory = new ProductFactory();
            ISqlCommandFactory commandFactory = new SqlCommandFactory();
            ISqlDbInstance db = new MockSqlDbInstance(mockProduct, mockProducts);

            productRepo = new ProductSqlRepository(productFactory, db, commandFactory);
        }

        IRepository<IProduct> productRepo;
        IProduct mockProduct;
        IEnumerable<IProduct> mockProducts;

        [TestMethod]
        [TestCategory("ProductSqlRepository, when Get is executed with a valid Id, it")]
        public void should_return_a_product_with_the_given_id() 
        {
            // given
            var expected = mockProduct;

            // when
            var actual = productRepo.Get(expected.Uid);

            // then
            actual.Uid.ShouldBeEquivalentTo(expected.Uid);
            actual.Title.ShouldBeEquivalentTo(expected.Title);
            actual.Description.ShouldBeEquivalentTo(expected.Description);
        }

        [TestMethod]
        [TestCategory("ProductSqlRepository, when Set is executed with valid data, it")]
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
        [TestCategory("ProductSqlRepository, when List is executed, it")]
        public void should_return_a_list_of_products()
        {
            // given
            var expected = mockProducts;

            // when
            var actual = productRepo.List(20, 0);

            // then
            actual.Count().Should().BeGreaterThan(2);
            actual.First().Uid.ShouldBeEquivalentTo(expected.First().Uid);
            actual.First().Title.ShouldBeEquivalentTo(expected.First().Title);
            actual.First().Description.ShouldBeEquivalentTo(expected.First().Description);
        }

        [TestMethod]
        [TestCategory("ProductSqlRepository, when Find is executed with valid search criteria, it")]
        public void should_return_products_that_meet_the_search_criteria()
        {
            // given
            var expected = mockProducts;
            var searchTerm = mockProducts.First().Title;

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
