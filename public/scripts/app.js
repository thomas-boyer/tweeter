$(document).ready(function() {

  function timeSince(milliseconds)
  {
    //If message is less than 10 seconds old
    if (milliseconds < 10000)
    {
      return "Just now";
    }
    //If message is less than 1 minute old
    else if (milliseconds < 60000)
    {
      //Convert relative time to seconds
      return `${Math.floor(milliseconds / 1000)} seconds ago`;
    }
    //If message is less than 1 hour old
    else if (milliseconds < 3600000)
    {
      //Convert relative time to minutes
      return `${Math.floor(milliseconds / 60000)} minute${ milliseconds < 120000 ? '' : 's'} ago`;
    }
    //if message is less than 1 day old
    else if (milliseconds < 86400000)
    {
      //Convert relative time to hours
      return `${Math.floor(milliseconds / 3600000)} hour${ milliseconds < 7200000 ? '' : 's'} ago`;
    }
    //if message is less than 1 year old
    else if (milliseconds < 31536000000)
    {
      //Convert relative time to days
      return `${Math.floor(milliseconds / 86400000)} day${ milliseconds < 172800000 ? '' : 's'} ago`;
    }
    else
    {
      //Convert relative time to years
      return `${Math.floor(milliseconds / 31536000000)} year${ milliseconds < 63072000000 ? '' : 's'} ago`;
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

    const $main = $("<main>").text(content.text);

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
      $('#tweets').prepend(createTweetElement(tweet));
    }
  }

  function loadTweets()
  {
    $.ajax('/tweets', { method: 'GET' })
    .then( (tweets) =>
      {
        renderTweets(tweets);
      });
  }

  loadTweets();

  $('#new-tweet-form').on('submit', function(e)
    {
      e.preventDefault();
      $('#new-tweet .error').slideUp(100);
      if (!this[0].value)
      {
        $('#new-tweet .error').slideDown(100);
        $('#new-tweet .error .message').text('No text has been entered.');
      }
      else if (this[0].value.length > 140)
      {
        $('#new-tweet .error').slideDown(100);
        $('#new-tweet .error .message').text('Your tweet must be no longer than 140 characters.');
      }
      else
      {
        $('#new-tweet .error').slideUp(100);
        const data = $(this).serialize();
        $.ajax('/tweets', { method: 'POST', data, success: function()
          {
            loadTweets();
          }});
      }
    });

$('#compose-button').on('click', function()
  {
    $('#new-tweet').slideToggle(100, function()
      {
        $('#tweet-input').focus();
      });
  });
});
