

window.demo_colors = {
  black: 0x000000,
  white: 0xffffff,

  green: 0x00e500,
  red: 0xf50a0a,
  yellow: 0xfff200,
  blue: 0x00c1f3,

  light_gray: 0x929292,
  dark_gray: 0x515151,
}

$(document).ready(function() {
  var step = 53;

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