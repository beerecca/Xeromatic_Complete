using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using Dapper;
using Xeromatic.Models;

namespace Xeromatic.Services
{
    public class TweetDbService : ITwitterService
    {
        private readonly string _connectionString = ConfigurationManager.ConnectionStrings["tweetDB"].ConnectionString;

        public IEnumerable<Tweet> GetTweets()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return connection.Query<Tweet>(@"SELECT Id, Text, RetweetCount, Image, Time FROM dbo.Tweet");
            }
        }

        public void InsertTweet(Tweet tweet)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Execute("INSERT INTO dbo.Tweet VALUES (@Id, @Text, @RetweetCount, @Image, @Time)", tweet);
            }
        }

        public void DeleteTweet(Tweet tweet)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Execute("DELETE FROM dbo.Tweet WHERE Id=@Id", new { tweet.Id });
            }
        }
    }
}