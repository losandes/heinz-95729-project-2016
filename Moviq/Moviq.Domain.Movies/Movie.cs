namespace Moviq.Domain.Movies
{
    using Moviq.Interfaces.Models;
    using System;
    using System.Collections.Generic;

    public class Movie : IMovie
    {
        public ICollection<IActor> Actors { get; set; }
        public ICollection<string> TrailerLinks { get; set; }
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Metadata { get; set; }
        public string ThumbnailLink { get; set; }
        public ICollection<string> PicLinks { get; set; }
        public int Rating { get; set; }
    }
}
