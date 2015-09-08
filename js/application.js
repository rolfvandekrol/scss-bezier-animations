
$(document).ready(function() {
  $('.content a.switch').click(function(e) {
    e.preventDefault();

    $('body').toggleClass('sidebar-open');
  });
});