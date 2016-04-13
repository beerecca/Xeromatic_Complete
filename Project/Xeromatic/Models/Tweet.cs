using System;

namespace Xeromatic.Models
{
    public class Tweet
    {
        public long Id { get; set; } 
        public string Text { get; set; }
        public int RetweetCount { get; set; }
        public string Image { get; set; }
        public string Time { get; set; }
    }
}