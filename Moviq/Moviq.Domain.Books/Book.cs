namespace Moviq.Domain.Books
{
    using Moviq.Interfaces.Models;
    using System;
    using System.Collections.Generic;

    public class Book : IBook, IHelpCategorizeNoSqlData
    {
        public Book() 
        {
            this._type = "book";
        }

        public ICollection<IAuthor> Authors { get; set; }
        public string Uid { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Metadata { get; set; }
        public decimal Price { get; set; }
        public string ThumbnailLink { get; set; }
        public string _type { get; set; }
    }
}
