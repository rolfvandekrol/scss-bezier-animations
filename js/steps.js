

// sweep(0) => 0
// sweep(1) => 1
// swepp(2) => 0
var sweep = function(t) {
  return Math.sin( // soften toothsaw
    Math.min(1, Math.max(-1, // flatten edges of toothsaw
      Math.asin(Math.sin(π*(t-0.5)))*0.7 // toothsaw
    ))
    *π/2
  )
  *0.5+0.5; // keep values between 0 and 1
};

var create_clock = function(duration) {
  var base;
  var paused;
  var waiting = {};

  var getT = function(now) {
    if (base === undefined) {
      return 0;
    }

    if (paused !== undefined) {
      return paused - base;
    }

    return (now - base);
  };

  var getVal = function(now) {
    if (base === undefined) {
      return 0;
    }

    return sweep(getT(now) / 1000 / duration);
  };

  var get = function() {
    if (base === undefined) {
      return 0;
    }

    var now = +new Date;
    var val = getVal(now);

    if (paused === undefined) {
      var k;
      for (k in waiting) {
        if (waiting.hasOwnProperty(k)) {
          if (waiting[k].check(val)) {
            waiting[k].callback();
            delete waiting[k];
          }
        }
      }
    }

    return val;
  };

  var start = function() {
    base = +new Date;
  };

  var pause = function() {
    if (base === undefined) {
      return;
    }

    paused = +new Date;
  };

  var pauseAt = function(val) {
    waitTill('pause', val, pause);
    if (base === undefined) {
      return;
    }
  };
  
  var resume = function() {
    if (base === undefined) {
      base = +new Date;
      return;
    } else {
      if (paused !== undefined) {
        var now = +new Date;
        base = base + (now - paused) // progress the base by the pause time

        paused = undefined;
      }
    }
  };

  var waitTill = function(key, val, callback) {
    var now = +new Date;
    var cur_val = getVal(now);

    if (val > cur_val) {
      waiting[key] = {
        check: function(v) {
          return (v >= val);
        },
        callback: callback
      };
    } else {
      waiting[key] = {
        check: function(v) {
          return (v <= val);
        },
        callback: callback
      };
    }
  };
  
  return {
    get: get,
    start: start,
    pause: pause,
    resume: resume,
    pauseAt: pauseAt,
    waitTill, waitTill
  };
};

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

    var clock = create_clock(3);

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
        zIndex: 1,
        opacity: 1
      });

      (function() {
        var i, j;
        var colors = ['yellow', 'blue', 'red', 'green'];

        for (j = 0; j < 4; j++) {
          for (i = 0; i < (4 - j); i++) {
            (function(i, j) {
              mathbox.curve({
                id: 'bezier-point-' + j + '-' + i,
                n: 1,
                opacity: 0,
                domain: [0, 1],
                expression: function (x) {
                  return decasteljau(i, j, clock.get());
                },
                points: true,
                line: false,
                color: demo_colors[colors[j]],
                pointSize: j > 0 ? 15 : 20,
                zIndex: j > 0 ? (2*j) : 10,
              });

              if (i < (3 - j)) {
                mathbox.bezier({
                  id: 'bezier-polygon-' + j + '-' + i,
                  n: 64,
                  domain: [0, 1],
                  expression: function (ii) {
                    return decasteljau(i + ii, j, clock.get());
                  },
                  order: 1,
                  color: demo_colors[colors[j]],
                  opacity: 0,
                  zIndex: 1 + (2 * j),
                });
              }
            })(i, j);
          }
        }
      })();

      mathbox.bezier({
        id: 'bezier-curve-dynamic',
        domain: [0, 1],
        expression: function(i) {
          return decasteljau(0, i, clock.get());
        },
        order: 3,
        color: demo_colors.green,
        zIndex: 1,
        opacity: 0,
      });
    };

    return [
      { key: 'bezier-1', 
        attach: function(step) { 
          setupBox(step); 
        }},
      { key: 'bezier-1', 
        attach: function(step) {
          setupBox(step); 
          mathbox.animate('#bezier-curve', { domain: [0, 1] }, { duration: 500 });
        },
        detachPrev: function(step) {
          mathbox.animate('#bezier-curve', { domain: [0, 0] }, { duration: 500 });
        }},
      { key: 'bezier-1',
        attach: function(step) {
          setupBox(step); 
          mathbox.animate('#bezier-point-0-0', { opacity: 1 }, { duration: 500 });
          mathbox.animate('#bezier-point-0-1', { opacity: 1 }, { duration: 500 });
          mathbox.animate('#bezier-point-0-2', { opacity: 1 }, { duration: 500 });
          mathbox.animate('#bezier-point-0-3', { opacity: 1 }, { duration: 500 });
        },
        detachPrev: function(step) {
          mathbox.animate('#bezier-point-0-0', { opacity: 0 }, { duration: 500 });
          mathbox.animate('#bezier-point-0-1', { opacity: 0 }, { duration: 500 });
          mathbox.animate('#bezier-point-0-2', { opacity: 0 }, { duration: 500 });
          mathbox.animate('#bezier-point-0-3', { opacity: 0 }, { duration: 500 });
        }},
      { key: 'bezier-1',
        attach: function(step) {
          setupBox(step); 
          mathbox.animate('#bezier-curve', { domain: [1, 1] }, { duration: 500 });
        },
        detachPrev: function(step) {
          mathbox.animate('#bezier-curve', { domain: [0, 1] }, { duration: 500 });
        }},
      { key: 'bezier-1',
        attach: function(step) {
          setupBox(step); 
          mathbox.animate('#bezier-polygon-0-0', { opacity: 1 }, { duration: 500 });
          mathbox.animate('#bezier-polygon-0-1', { opacity: 1 }, { duration: 500 });
          mathbox.animate('#bezier-polygon-0-2', { opacity: 1 }, { duration: 500 });
        },
        detachPrev: function(step) {
          mathbox.animate('#bezier-polygon-0-0', { opacity: 0 }, { duration: 500 });
          mathbox.animate('#bezier-polygon-0-1', { opacity: 0 }, { duration: 500 });
          mathbox.animate('#bezier-polygon-0-2', { opacity: 0 }, { duration: 500 });
        }},
      { key: 'bezier-1',
        attach: function(step) {
          setupBox(step); 
          mathbox.set('#bezier-point-1-0', { opacity: 1 });
          mathbox.set('#bezier-point-1-1', { opacity: 1 });
          mathbox.set('#bezier-point-1-2', { opacity: 1 });
          clock.resume();
        },
        detachPrev: function(step) {
          clock.waitTill('point-1', 0, function() {
            mathbox.set('#bezier-point-1-0', { opacity: 0 });
            mathbox.set('#bezier-point-1-1', { opacity: 0 });
            mathbox.set('#bezier-point-1-2', { opacity: 0 });
            clock.pause();
          });
        }},
      { key: 'bezier-1',
        attach: function(step) {
          setupBox(step);
          clock.waitTill('polygon-1', 0.5, function() {
            mathbox.animate('#bezier-polygon-1-0', { opacity: 1 }, { duration: 500 });
            mathbox.animate('#bezier-polygon-1-1', { opacity: 1 }, { duration: 500 });
          });
        },
        detachPrev: function(step) {
          mathbox.animate('#bezier-polygon-1-0', { opacity: 0 }, { duration: 500 });
          mathbox.animate('#bezier-polygon-1-1', { opacity: 0 }, { duration: 500 });
        }},
      { key: 'bezier-1', 
        attach: function(step) {
          setupBox(step);
          clock.waitTill('points-2', 0, function() {
            mathbox.set('#bezier-point-2-0', { opacity: 1 });
            mathbox.set('#bezier-point-2-1', { opacity: 1 });
          });
        },
        detachPrev: function(step) {
          clock.waitTill('point-2', 0, function() {
            mathbox.set('#bezier-point-2-0', { opacity: 0 });
            mathbox.set('#bezier-point-2-1', { opacity: 0 });
          });
        }},
      { key: 'bezier-1',
        attach: function(step) {
          setupBox(step);
          clock.waitTill('polygon-2', 0.5, function() {
            mathbox.animate('#bezier-polygon-2-0', { opacity: 1 }, { duration: 500 });
          });
        },
        detachPrev: function(step) {
          mathbox.animate('#bezier-polygon-2-0', { opacity: 0 }, { duration: 500 });
        }},
      { key: 'bezier-1', 
        attach: function(step) {
          setupBox(step);
          clock.waitTill('points-3', 0, function() {
            mathbox.set('#bezier-point-3-0', { opacity: 1 });
          });
        },
        detachPrev: function(step) {
          clock.waitTill('points-3', 0, function() {
            mathbox.set('#bezier-point-3-0', { opacity: 0 });
          });
        }},
      { key: 'bezier-1', 
        attach: function(step) {
          setupBox(step);
          clock.waitTill('curve-dynamic', 0, function() {
            mathbox.set('#bezier-curve-dynamic', { opacity: 1 });
          });
        },
        detachPrev: function(step) {
          clock.waitTill('curve-dynamic', 0, function() {
            mathbox.set('#bezier-curve-dynamic', { opacity: 0 });
          });
        }},
      { key: 'bezier-1', 
        attach: function(step) {
          setupBox(step);
          clock.pauseAt(0.65);
        },
        detachPrev: function(step) {
          clock.resume();
        }},
    ];
  })()
);
