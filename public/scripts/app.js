$(document).ready(function() {

  function timeSince(millisecondsAgo)
  {
    //If message is less than 1 minute old
    if (millisecondsAgo < 60000)
    {
      //Convert relative time to seconds
      return `${Math.floor(millisecondsAgo / 1000)} second${ millisecondsAgo < 2000 ? '' : 's'} ago`;
    }
    //If message is less than 1 hour old
    else if (millisecondsAgo < 3600000)
    {
      //Convert relative time to minutes
      return `${Math.floor(millisecondsAgo / 60000)} minute${ millisecondsAgo < 120000 ? '' : 's'} ago`;
    }
    //if message is less than 1 day old
    else if (millisecondsAgo < 86400000)
    {
      //Convert relative time to hours
      return `${Math.floor(millisecondsAgo / 3600000)} hour${ millisecondsAgo < 7200000 ? '' : 's'} ago`;
    }
    //if message is less than 1 year old
    else if (millisecondsAgo < 31536000000)
    {
      //Convert relative time to days
      return `${Math.floor(millisecondsAgo / 86400000)} day${ millisecondsAgo < 172800000 ? '' : 's'} ago`;
    }
    else
    {
      //Convert relative time to years
      return `${Math.floor(millisecondsAgo / 31536000000)} year${ millisecondsAgo < 63072000000 ? '' : 's'} ago`;
    }
  }

  function createTweetElement(tweetData)
  {
    const { user, content, created_at } = tweetData;
    const { name, avatars, handle } = user;

    const $header = $("<header>").addClass("flex-container");
    $header.append(`<img src="${avatars.small}" alt="Avatar for user ${name}">`);
    $header.append(`<h2>${name}</h2>`);
    $header.append(`<span class="handle">${handle}</span>`);

    const $main = $(`<main>${content.text}</main>`);

    const $footer = $("<footer>").addClass("flex-container");
    $footer.append(`<span class="time">${timeSince(Date.now() - created_at)}</span>`);
    $footer.append(`<div class="icons"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>`);

    const $tweet = $("<article>").addClass("tweet").append($header).append($main).append($footer);
    return $tweet;
  }

  function renderTweets(tweets)
  {
    for (let tweet of tweets)
    {
      $('#tweets').append(createTweetElement(tweet));
    }
  }

  // Fake data taken from tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  console.log(data);
  renderTweets(data);
});
