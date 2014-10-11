namespace Moviq.Domain.Movies.Tests.Mocks
{
    using Moviq.Domain.Products;
    using Moviq.Domain.Products.Tests.Mocks;
    using Moviq.Interfaces.Factories;
    using Moviq.Interfaces.Models;
    using Moviq.Interfaces.Repositories;
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Threading.Tasks;

    public class MockBookRepository : IRepository<IProduct>
    {
        public MockBookRepository(IFactory<IProduct> productFactory)
        {
            this.productFactory = productFactory;
        }

        IFactory<IProduct> productFactory;
        public IEnumerable<IProduct> mockProducts = MockProducts.MockBooks;

        public IProduct Get(string id)
        {
            return mockProducts.First();
        }

        public IProduct Set(IProduct product)
        {
            return product;
        }

        public IEnumerable<IProduct> List(int take, int skip)
        {
            return mockProducts;
        }

        public Task<IEnumerable<IProduct>> Find(string searchBy)
        {
            return Task.Run(() => { return mockProducts; });
        }

        public bool Delete(string id)
        {
            return true;
        }

        public void Dispose()
        {
            
        }
    }
}

