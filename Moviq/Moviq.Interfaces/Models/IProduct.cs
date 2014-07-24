namespace Moviq.Interfaces.Models
{
    using System.Collections.Generic;

    public interface IProduct
    {
        int Id { get; set; }
        string Title { get; set; }
        string Description { get; set; }
        string Metadata { get; set; }
        decimal Price { get; set; }
        string ThumbnailLink { get; set; }
    }

    //// sample metadata
    //{
    //  "backdrop_path": "/39R1ItA8srBv07z3ZG6MUA3uD2p.jpg",
    //  "id": 1672,
    //  "original_title": "Le Professionnel",
    //  "release_date": "1981-10-21",
    //  "poster_path": "/A7Yjc5a1DTvijtaQG08h8ufDQKA.jpg",
    //  "popularity": 1.55987,
    //  "title": "The Professional",
    //  "vote_average": 10,
    //  "vote_count": 2,
    //  "price_sd": 4.99,
    //  "price_hd": 9.99
    //}
}
