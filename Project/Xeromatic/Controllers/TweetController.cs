using System.Collections.Generic;
using Xeromatic.Models;
using Xeromatic.Services;
using System.Web.Http;

namespace Xeromatic.Controllers
{
    public class TweetController : ApiController
    {
        private readonly TweetDbService _tweetDbService;
        private readonly TwitterApiService _twitterApiService;

        public TweetController()
        {
            _tweetDbService = new TweetDbService();
            _twitterApiService = new TwitterApiService();
        }

        // GET: /PinnedTweets
        // Returns the tweets from the database.
        [HttpGet]
        [Route("PinnedTweets")]
        public IEnumerable<Tweet> PinnedTweets()
        {
            return _tweetDbService.GetTweets();
        }

        // GET: /RecentTweets
        // Returns the tweets from the Twitter API
        [HttpGet]
        [Route("RecentTweets")]
        public IEnumerable<Tweet> RecentTweets()
        {
            return  _twitterApiService.GetTweets();
        }

        // POST: /PinTweet
        // Saves a tweet in the database
        [HttpPost]
        [Route("PinTweet")]
        public void PinTweet(Tweet tweet)
        {
            _tweetDbService.InsertTweet(tweet);
        }

        // POST: /unpinTweet
        // Removes a tweet from the database
        [HttpPost]
        [Route("UnpinTweet")]
        public void UnpinTweet(Tweet tweet)
        {
            _tweetDbService.DeleteTweet(tweet);
        }
    }
}
