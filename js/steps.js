
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
  })(),


  (function() {
    var mathbox;

    var fixed = {};
    var clocks = {};
    var clock = function (id) {
      if (!clocks[id]) clocks[id] = +new Date();
      d = +new Date;
      if (fixed[id]) d = fixed[id];
      return (d - clocks[id]) * .001;
    };

    var fixClock = function(id) {
      var d = +new Date();
      if (!clocks[id]) clocks[id] = d;
      if (!fixed[id]) fixed[id] = d;
    };

    var unfixClock = function(id) {
      if (fixed[id]) {
        var d = +new Date();
        clocks[id] = d - fixed[id] + clocks[id];
        delete fixed[id];
      }
    };

    var lerptime = function(t) {
      t = t*.33-.5;
      t = Math.sin(Math.min(1, Math.max(-1, .7*Math.asin(Math.sin(π*t))))*τ/4);
      return t*.5+.5;
    }

    var c = [[0, 0], [0.25, 0.1], [0.25, 1], [1,1]];

    var decasteljau = function(i, j, t0) {
      if (j == 0) {
        return c[i];
      }

      var a = decasteljau(i, j-1, t0);
      var b = decasteljau(i+1, j-1, t0);

      var u0 = 1.0 - t0;
      return [
        a[0] * u0 + b[0] * t0,
        a[1] * u0 + b[1] * t0
      ];
    };

    var setupBox = function(step) {
      if (mathbox === undefined) {
        var element = $('.bezier', step).get(0);
        mathbox = mathBox(element, {}).start();

        mathbox.world().tRenderer().setClearColorHex(demo_colors.black, 0);
        mathbox
        // Cartesian viewport
        .viewport({
          type: 'cartesian',
          range: [[0, 1], [0, 1]],
          scale: [1, 1],
        })

        // Grid
        .grid({
          axis: [0, 1],
          color: demo_colors.dark_gray,
          lineWidth: 1,
        });

        setupElements();
      }
    };

    var setupElements = function() {
      // main curve
      mathbox.bezier({
        id: 'bezier-curve',
        domain: [0, 0],
        data: c,
        order: 3,
        color: demo_colors.green,
        zIndex: 1
      });

      // bezier points
      mathbox.curve({
        id: 'bezier-points',
        n: 4,
        opacity: 0,
        domain: [0, 3],
        expression: function (x) {
          return c[x];
        },
        points: true,
        line: false,
        color: demo_colors.light_gray,
        pointSize: 20,
        zIndex: 4,
      });

      for (var i = 1; i <= 3; i++) {
        mathbox.bezier({
          id: 'bezier-polygon-' + i,
          domain: [0, 0],
          data: [c[i-1], c[i]],
          order: 1,
          color: demo_colors.light_gray,
          opacity: 1,
          zIndex: 2
        });
      };
      
      mathbox.curve({
        id: 'bezier-points-1',
        n: 3,
        opacity: 0,
        domain: [0, 2],
        expression: function (x) {
          return decasteljau(x, 1, lerptime(clock('bezier-points-1')));
        },
        points: true,
        line: false,
        color: demo_colors.light_gray,
        pointSize: 15,
        zIndex: 3,
      });

      mathbox.bezier({
        id: 'bezier-polygon-1-1',
        n: 64,
        domain: [0, 1],
        expression: function (i) {
          return decasteljau(i, 1, lerptime(clock('bezier-points-1')));
        },
        order: 1,
        color: demo_colors.light_gray,
        opacity: 0,
        zIndex: 2
      });
      mathbox.bezier({
        id: 'bezier-polygon-1-2',
        n: 64,
        domain: [0, 1],
        expression: function (i) {
          return decasteljau(i+1, 1, lerptime(clock('bezier-points-1')));
        },
        order: 1,
        color: demo_colors.light_gray,
        opacity: 0,
        zIndex: 2
      });

      mathbox.curve({
        id: 'bezier-points-2',
        n: 2,
        opacity: 0,
        domain: [0, 1],
        expression: function (i) {
          return decasteljau(i, 2, lerptime(clock('bezier-points-1')));
        },
        points: true,
        line: false,
        color: demo_colors.light_gray,
        pointSize: 15,
        zIndex: 3,
      });

      mathbox.bezier({
        id: 'bezier-polygon-2-1',
        n: 64,
        domain: [0, 1],
        expression: function (i) {
          return decasteljau(i, 2, lerptime(clock('bezier-points-1')));
        },
        order: 1,
        color: demo_colors.light_gray,
        opacity: 0,
        zIndex: 2
      });

      mathbox.curve({
        id: 'bezier-points-3',
        n: 1,
        opacity: 0,
        domain: [0, 2],
        expression: function (x) {
          return decasteljau(0, 3, lerptime(clock('bezier-points-1')));
        },
        points: true,
        line: false,
        color: demo_colors.green,
        pointSize: 15,
        zIndex: 3,
      });

      mathbox.bezier({
        id: 'bezier-curve-2',
        domain: [0, 1],
        expression: function(i) {
          return decasteljau(0, i, lerptime(clock('bezier-points-1')));
        },
        order: 3,
        color: demo_colors.green,
        zIndex: 1,
        opacity: 0
      });
    }

    var attach1 = function(step) {
      setupBox(step);
    };

    var attach2 = function(step) {
      setupBox(step);
      mathbox.animate('#bezier-curve', { domain: [0, 1] }, { duration: 500 });
    };
    var detach2 = function(step) {
      mathbox.animate('#bezier-curve', { domain: [0, 0] }, { duration: 500 });
    };
    var attach3 = function(step) {
      setupBox(step);
      mathbox.animate('#bezier-points', { opacity: 1 }, { duration: 500 });
    };
    var detach3 = function(step) {
      mathbox.animate('#bezier-points', { opacity: 0 }, { duration: 500 });
    };
    var attach4 = function(step) {
      setupBox(step);
      mathbox.animate('#bezier-curve', { domain: [1,1] }, { duration: 500 });
    };
    var detach4 = function(step) {
      mathbox.animate('#bezier-curve', { domain: [0,1] }, { duration: 500 });
    };
    var attach5 = function(step) {
      setupBox(step);
      mathbox.animate('#bezier-polygon-1', { domain: [0,1] }, { duration: 200 });
      mathbox.animate('#bezier-polygon-2', { domain: [0,1] }, { duration: 200, delay: 200 });
      mathbox.animate('#bezier-polygon-3', { domain: [0,1] }, { duration: 200, delay: 400 });
    };
    var detach5 = function(step) {
      mathbox.animate('#bezier-polygon-3', { domain: [0,0] }, { duration: 200 });
      mathbox.animate('#bezier-polygon-2', { domain: [0,0] }, { duration: 200, delay: 200 });
      mathbox.animate('#bezier-polygon-1', { domain: [0,0] }, { duration: 200, delay: 400 });
    };
    var attach6 = function(step) {
      setupBox(step);
      mathbox.animate('#bezier-points-1', { opacity: 1 }, { duration: 500 });
    };
    var detach6 = function(step) {
      mathbox.animate('#bezier-points-1', { opacity: 0 }, { duration: 500 });
    };
    var attach7 = function(step) {
      setupBox(step);
      mathbox.animate('#bezier-polygon-1-1', { opacity: 1 }, { duration: 200 });
      mathbox.animate('#bezier-polygon-1-2', { opacity: 1 }, { duration: 200, delay: 200 });
    };
    var detach7 = function(step) {
      mathbox.animate('#bezier-polygon-1-2', { opacity: 0 }, { duration: 200 });
      mathbox.animate('#bezier-polygon-1-1', { opacity: 0 }, { duration: 200, delay: 200 });
    };
    var attach8 = function(step) {
      setupBox(step);
      mathbox.animate('#bezier-points-2', { opacity: 1 }, { duration: 500 });
    };
    var detach8 = function(step) {
      mathbox.animate('#bezier-points-2', { opacity: 0 }, { duration: 500 });
    };
    var attach9 = function(step) {
      setupBox(step);
      mathbox.animate('#bezier-polygon-2-1', { opacity: 1 }, { duration: 500 });
    };
    var detach9 = function(step) {
      mathbox.animate('#bezier-polygon-2-1', { opacity: 0 }, { duration: 500 });
    };
    var attach10 = function(step) {
      setupBox(step);
      mathbox.animate('#bezier-points-3', { opacity: 1 }, { duration: 500 });
    };
    var detach10 = function(step) {
      mathbox.animate('#bezier-points-3', { opacity: 0 }, { duration: 500 });
    };

    var attach11 = function(step) {
      setupBox(step);
      // mathbox.set('#bezier-curve', { domain_expression: function() {
      //   return [ 0, lerptime(clock('bezier-points-1')) ];
      // } }, { duration: 500 });

      mathbox.animate('#bezier-curve-2', { opacity: 1 }, { duration: 500 });
    };
    var detach11 = function(step) {
      // mathbox.set('#bezier-curve', { domain_expression: null }, { duration: 500 });
      mathbox.animate('#bezier-curve-2', { opacity: 0 }, { duration: 500 });
    };

    var attach12 = function(step) {
      fixClock('bezier-points-1');
    };
    var detach12 = function(step) {
      unfixClock('bezier-points-1');
    }

    var attach13 = function(step) {
      //fixClock('bezier-points-1');
    };
    var detach13 = function(step) {
      //unfixClock('bezier-points-1');
    }

    return [
      { key: 'bezier-1', attach: attach1 },
      { key: 'bezier-1', attach: attach2, detachPrev: detach2 },
      { key: 'bezier-1', attach: attach3, detachPrev: detach3 },
      { key: 'bezier-1', attach: attach4, detachPrev: detach4 },
      { key: 'bezier-1', attach: attach5, detachPrev: detach5 },
      { key: 'bezier-1', attach: attach6, detachPrev: detach6 },
      { key: 'bezier-1', attach: attach7, detachPrev: detach7 },
      { key: 'bezier-1', attach: attach8, detachPrev: detach8 },
      { key: 'bezier-1', attach: attach9, detachPrev: detach9 },
      { key: 'bezier-1', attach: attach10, detachPrev: detach10 },
      { key: 'bezier-1', attach: attach11, detachPrev: detach11 },
      { key: 'bezier-1', attach: attach12, detachPrev: detach12 },
      // { key: 'bezier-1', attach: attach13, detachPrev: detach13 },
    ];
  })()
);
