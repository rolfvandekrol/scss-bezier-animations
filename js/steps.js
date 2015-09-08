
var intro_example_go = {
  attach: function(step) {
    step.addClass('intro-example-go');
  },
  detachPrev: function(step) {
    step.removeClass('intro-example-go');
  }
};

var steps = [
  { key: 'cover' },
  { key: 'intro-1' },
  jQuery.extend({ key: 'intro-1' }, intro_example_go),
  { key: 'intro-2' },
  jQuery.extend({ key: 'intro-2' }, intro_example_go),
  { key: 'intro-3' },
  jQuery.extend({ key: 'intro-3' }, intro_example_go),
  { key: 'intro-4' },
  jQuery.extend({ key: 'intro-4' }, intro_example_go),
  { key: 'intro-5' },
  jQuery.extend({ key: 'intro-5' }, intro_example_go),
  { key: 'intro-6' },
  jQuery.extend({ key: 'intro-6' }, intro_example_go),
  { key: 'intro-7' },
  jQuery.extend({ key: 'intro-7' }, intro_example_go),
];