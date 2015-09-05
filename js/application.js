
$(document).ready(function() {
  $('.content a').click(function(e) {
    e.preventDefault();

    $('body').toggleClass('sidebar-open');
  });
});