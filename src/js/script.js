// select element that needs to be updated
var $element = $('.lorem__exemple');

// on click
$('.lorem__link').click(function(event) {
  event.preventDefault();

//   switch($(this).attr('href')) {
//     case 'riker.html':
//       url = "parts/riker.php";
//       break;
//     case 'bacon.html':
//       url = "parts/bacon.php";
//       break;
//     case 'samuell.html':
//       url = "parts/samuell.php";
//       break;
//     default:
//       url = "parts/lorem.php";
// }

  //$element.load($(this).attr('href') + ' .lorem__exemple');
  //$element.load($(this).data('load'));

  // get the url
  var url = $(this).attr('href');

  // get the data with an ajax call
  $.get( url, function( html ) {

    // filtrer result
    var $lorem = $(html).find('.lorem__exemple');

    // inject result into the DOM
    $element.html($lorem);
  });
});
