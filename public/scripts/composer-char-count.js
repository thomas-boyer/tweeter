$(document).ready(function() {

  const maxValue = $('.counter').text();
  $('#tweet-input').on('input', function()
    {
      $('.counter').text(maxValue - $(this).val().length);

      $('.counter').text() < 0 ? $('.counter').addClass("invalid") : $('.counter').removeClass("invalid");
    })
});