"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  const tweets = db.collection('tweets');

  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      tweets.insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      tweets.find().toArray((err, tweets) =>
        {
          if (err)
          {
            return callback(err);
          }
          callback(null, tweets.sort(sortNewestFirst));
        });
    }
  }
}
