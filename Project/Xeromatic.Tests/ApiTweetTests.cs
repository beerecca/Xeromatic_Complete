using System.Linq;
using Xeromatic.Services;
using Xunit;

namespace Xeromatic.Tests
{
    public class ApiTweetTests
    {
        private readonly TwitterApiService _twitterApiService = new TwitterApiService();

        //Then view your test in the Test Explorer to run it.
        [Fact]
        public void EnsureTenTweetsFromService()
        {
            var tweets = _twitterApiService.GetTweets();
            Assert.Equal(10, tweets.Count());
        }
    }
}
