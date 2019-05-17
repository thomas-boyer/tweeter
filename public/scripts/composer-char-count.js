$(document).ready(function() {

  const maxValue = 140;

  $('#new-tweet-desktop-container .tweet-input').on('input', function()
    {
      $(this).next().children().last().text(maxValue - $(this).val().length);

      $(this).next().children().last().text() < 0 ? $('#new-tweet-desktop-container .counter').addClass("invalid") : $('#new-tweet-desktop-container .counter').removeClass("invalid");
    })

  $('#new-tweet-mobile-container .tweet-input').on('input', function()
    {
      $(this).next().children().last().text(maxValue - $(this).val().length);

      $(this).next().children().last().text() < 0 ? $('#new-tweet-mobile-container .counter').addClass("invalid") : $('#new-tweet-mobile-container .counter').removeClass("invalid");
    })
});