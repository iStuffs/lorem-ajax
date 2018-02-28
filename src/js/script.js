var $element = $('.lorem__exemple');
$('.lorem__link').click(function(event) {
  event.preventDefault();

/*

*/
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

  var url = $(this).attr('href');
  $.get( url, function( html ) {
    var $lorem = $(html).find('.lorem__exemple');
    // filtrer
    //injection dans le html
    $element.html($lorem);
  });
  // faire un appel get de l'url

});
