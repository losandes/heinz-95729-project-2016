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
        public void ProductRepository_Get_should_return_a_product_with_the_given_id() 
        {
            // given
            var expected = mockProduct;

            // when
            var actual = productRepo.Get(expected.Id);

            // then
            Assert.AreEqual(expected.Id, actual.Id);
            Assert.AreEqual(expected.Title, actual.Title);
            Assert.AreEqual(expected.Description, actual.Description);
        }

        [TestMethod]
        public void ProductRepository_Set_should_return_the_product_that_was_created()
        {
            // given
            var expected = mockProduct;

            // when
            var actual = productRepo.Set(expected);

            // then
            Assert.AreEqual(expected.Id, actual.Id);
            Assert.AreEqual(expected.Title, actual.Title);
            Assert.AreEqual(expected.Description, actual.Description);
        }

        [TestMethod]
        public void ProductRepository_List_should_return_a_list_of_products()
        {
            // given
            var expected = mockProducts;

            // when
            var actual = productRepo.List(20, 0);

            // then
            Assert.IsTrue(actual.Count() > 2);
            Assert.AreEqual(expected.First().Id, actual.First().Id);
            Assert.AreEqual(expected.First().Title, actual.First().Title);
            Assert.AreEqual(expected.First().Description, actual.First().Description);
        }

        [TestMethod]
        public void ProductRepository_Find_should_return_products_that_meet_the_search_criteria()
        {
            // given
            var expected = mockProducts;
            var searchTerm = mockProducts.First().Title;

            // when
            var actual = productRepo.Find(searchTerm);

            // then
            Assert.IsTrue(actual.Count() > 2);
            Assert.AreEqual(expected.First().Id, actual.First().Id);
            Assert.AreEqual(expected.First().Title, actual.First().Title);
            Assert.AreEqual(expected.First().Description, actual.First().Description);
        }
    }
}
