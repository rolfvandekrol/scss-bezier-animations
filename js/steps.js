
var steps = [].concat(
  [{ key: 'cover' }],

  (function() {
    var intro_example_go = {
      attach: function(step) {
        step.addClass('intro-example-go');
      },
      detachPrev: function(step) {
        step.removeClass('intro-example-go');
      }
    };

    var result = [];
    for (var i = 1; i <= 7; i++) {
      result.push({ key: 'intro-' + i});
      result.push(jQuery.extend({ key: 'intro-' + i}, intro_example_go));
    }

    return result;
  })()
);
