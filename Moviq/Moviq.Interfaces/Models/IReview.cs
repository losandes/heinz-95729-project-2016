using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moviq.Interfaces.Models
{
    public interface IReview
    {
        int Id { get; set; }
        IProduct Product { get; set; }
        int Rating { get; set; }
        IUser Reviewer { get; set; }
        string Body { get; set; }
    }

    public interface IReviewVotes
    {
        int ReviewId { get; set; }
        bool ThumbsUp { get; set; }
        IUser Voter { get; set; }
    }
}
