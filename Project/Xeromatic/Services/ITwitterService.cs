using System.Collections.Generic;
using Xeromatic.Models;

namespace Xeromatic.Services
{
    public interface ITwitterService
    {
        IEnumerable<Tweet> GetTweets();
    }
}
