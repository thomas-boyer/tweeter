$(document).ready(function() {

  const maxValue = $('.counter').text();
  $('#tweet-input').on('input', function()
    {
      $(this).next().children().last().text(maxValue - $(this).val().length);

      $(this).next().children().last().text() < 0 ? $('.counter').addClass("invalid") : $('.counter').removeClass("invalid");
    })
});