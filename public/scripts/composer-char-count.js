$(document).ready(function() {

  //Listen for change in new-tweet textarea text
  $('.tweet-input').on('input', function()
    {
      //Subtract length of textarea text by maximum value
      const maxValue = 140;
      $(this).next().children().last().text(maxValue - $(this).val().length);

      //Check whether user is using mobile or desktop form
      let container;
      if ($(this).parents('.container').attr('id') === 'new-tweet-desktop-container')
      {
        container = '#new-tweet-desktop-container';
      }
      else if ($(this).parents('.container').attr('id') === 'new-tweet-mobile-container')
      {
        container = '#new-tweet-mobile-container';
      }

      //Color the appropriate counter with red text
      $(this).next().children().last().text() < 0 ? $(`${container} .counter`).addClass('invalid') : $(`${container} .counter`).removeClass('invalid');
    })
});