
$(document).ready(function() {
  var step = 0;

  var redraw = function() {
    var w = $(window).width();
    var t = $('.steps-container > .step').length;
    var s = $('.steps-container .step.step-' + steps[step].key).prevAll('.step').length;

    $('.steps-container').css({
      width: w*t,
      transform: 'translatex(' + (-1*w*s) + 'px)',
      
    });
    $('.steps-container > .step').css('width', w);
  };

  var change_step = function(new_step) {
    var prev_step = step;
    step = new_step;
    redraw();

    if (steps[prev_step].detach !== undefined) {
      steps[prev_step].detach($('.steps-container .step.step-' + steps[prev_step].key));
    }
    if (prev_step < step && steps[prev_step].detachNext !== undefined) {
      steps[prev_step].detachNext($('.steps-container .step.step-' + steps[prev_step].key));
    }
    if (prev_step > step && steps[prev_step].detachPrev !== undefined) {
      steps[prev_step].detachPrev($('.steps-container .step.step-' + steps[prev_step].key));
    }

    if (steps[step].attach !== undefined) {
      steps[step].attach($('.steps-container .step.step-' + steps[step].key));
    }
  };

  var setup = function() {
    redraw();
    if (steps[step].attach !== undefined) {
      steps[step].attach($('.steps-container .step.step-' + steps[step].key));
    }

    $(window).on('load resize', redraw);
    $(window).keydown(function(event) {
      if (event.keyCode == 32 || event.keyCode == 39) {
        if (step < steps.length-1) {
          change_step(step + 1);
        }
      }

      if (event.keyCode == 37) {
        if (step > 0) {
          change_step(step - 1);
        }
      }
    });
  };

  ThreeBox.preload([
    'shaders/glsl.html',
  ], setup);

});