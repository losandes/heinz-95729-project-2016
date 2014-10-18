using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moviq.Interfaces.Models;
using System.Linq;

namespace Moviq.Interfaces.Tests
{
    [TestClass]
    public class IHelpCategorizeNoSqlDataTests
    {
        //[TestMethod]
        //[TestCategory("IHelpCategorizeNoSqlDataTests, when constructed, should always have the _type set")]
        public void should_return_a_product_with_the_given_id()
        {
            // given
            var types = AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(s => s.GetTypes())
                .Where(p => typeof(IHelpCategorizeNoSqlData).IsAssignableFrom(p) && p.IsClass);

            // when
            foreach (var type in types) 
            { 
                // get the constructor and invoke it

                // then
                // check to see if _type is set
            }
        }
    }
}
