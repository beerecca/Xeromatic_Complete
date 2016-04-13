using System.Collections.Generic;
using System.Linq;
using Tweetinvi;
using Tweetinvi.Core.Credentials;
using Tweet = Xeromatic.Models.Tweet;

namespace Xeromatic.Services
{
    public class TwitterApiService : ITwitterService
    {
        // Get keys from: https://apps.twitter.com
        // Wiki for tweetinvi: https://github.com/linvi/tweetinvi/wiki

        readonly TwitterCredentials _creds;

        public TwitterApiService()
        {
            _creds = new TwitterCredentials
            {
                ConsumerKey = "Add your Consumer Key here",
                ConsumerSecret = "Add your Consumer Secret here",
                AccessToken = "Add your Access Token here",
                AccessTokenSecret = "Add your Access Token Secret here"
            };
        }

        public IEnumerable<Tweet> GetTweets()
        {
            var tweets = Auth.ExecuteOperationWithCredentials(_creds, () => Timeline.GetUserTimeline("xero", 10)).ToList();
            
            if (tweets.Any())
                return tweets.Select(t => new Tweet
                {
                    Id = t.Id,
                    Text = t.Text,
                    RetweetCount = t.RetweetCount,
                    Time = t.CreatedAt.ToString("g"),
                    Image = t.Media.Any() ? t.Media.First().MediaURL : null
                });

            return new List<Tweet>();   // Good practice to return an empty list to avoid null pointers
        }

    }
}