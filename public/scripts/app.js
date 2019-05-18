$(document).ready(function() {

  function timeSince(milliseconds)
  {
    //If message is less than 10 seconds old
    if (milliseconds < 10000)
    {
      return 'Just now';
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

    const $header = $('<header>').addClass('flex-container');
    $header.append(`<img src='${avatars.small}' alt='Avatar for user ${name}'>`);
    $header.append(`<div class='name'><h2>${name}</h2></div>`);
    $header.append(`<div class='handle'>${handle}</div>`);

    const $mobileHandle = $(`<div class='mobile-handle'>${handle}</div>`);

    const $main = $('<main>').text(content.text);

    const $footer = $('<footer>').addClass('flex-container');
    $footer.append(`<span class='time'>${timeSince(Date.now() - created_at)}</span>`);
    $footer.append(`<div class='icons'><i class='fas fa-flag'></i><i class='fas fa-retweet'></i><i class='fas fa-heart'></i></div>`);

    const $tweet = $('<article>').addClass('tweet').append($header).append($mobileHandle).append($main).append($footer);
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

  $('#new-tweet-mobile-container .new-tweet-form').on('submit', function(e)
    {
      e.preventDefault();
      $('#new-tweet-mobile-container .new-tweet .error').slideUp(300);
      if (!this[0].value)
      {
        $('#new-tweet-mobile-container .new-tweet .error').slideDown(300);
        $('#new-tweet-mobile-container .new-tweet .error .message').text('No text has been entered.');
      }
      else if (this[0].value.length > 140)
      {
        $('#new-tweet-mobile-container .new-tweet .error').slideDown(300);
        $('#new-tweet-mobile-container .new-tweet .error .message').text('Your tweet must be no longer than 140 characters.');
      }
      else
      {
        const data = $(this).serialize();
        $(this).children('textarea').val('');
        $.ajax('/tweets', { method: 'POST', data, success: function()
          {
            loadTweets();
          }});
      }
    });

  $('#new-tweet-desktop-container .new-tweet-form').on('submit', function(e)
    {
      e.preventDefault();
      $('#new-tweet-desktop-container .error').slideUp(300);
      if (!this[0].value)
      {
        $('#new-tweet-desktop-container .error').slideDown(300);
        $('#new-tweet-desktop-container .error .message').text('No text has been entered.');
      }
      else if (this[0].value.length > 140)
      {
        $('#new-tweet-desktop-container .error').slideDown(300);
        $('#new-tweet-desktop-container .error .message').text('Your tweet must be no longer than 140 characters.');
      }
      else
      {
        const data = $(this).serialize();
        $(this).children('textarea').val('');
        $.ajax('/tweets', { method: 'POST', data, success: function()
          {
            loadTweets();
          }});
      }
    });

  $('.desktop.compose-button').on('click', function()
    {
      $('#new-tweet-desktop-container').slideToggle(300, function()
        {
          console.log('hey');
          $('#new-tweet-desktop-container .tweet-input').focus();
        });
    });

  $('.mobile.compose-button').on('click', function()
    {
      $('#new-tweet-mobile-container').slideToggle(300, function()
        {
          $('#new-tweet-mobile-container .tweet-input').focus();
        });
    });
});



