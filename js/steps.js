
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

    var c = [[0, 0], [0.25, 0.1], [0.25, 1], [1,1]];

    var attach1 = function(step) {
      if (mathbox === undefined) {
        var element = $('.bezier', step).get(0);
        mathbox = mathBox(element, {
          
        }).start();

        mathbox.world().tRenderer().setClearColorHex(0x000000, 0);
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
          color: 0x515151,
          lineWidth: 1,
        })
        .bezier({
          id: 'bezier-curve',
          n: 64,
          domain: [0, 0],
          data: c,
          order: 3,
          points: false,
          line: true,
          color: 0x00e500
        })
        .curve({
          id: 'bezier-points',
          n: 4,
          opacity: 0,
          domain: [0, 3],
          expression: function (x) {
            return c[x];
          },
          points: true,
          line: false,
          color: 0x929292,
          pointSize: 20,
          zIndex: 1,
        })
        .bezier({
          id: 'bezier-polygon-1',
          n: 64,
          domain: [0, 0],
          data: [c[0], c[1]],
          order: 1,
          points: false,
          line: true,
          color: 0x00e500,
          opacity: 1
        })
        .bezier({
          id: 'bezier-polygon-2',
          n: 64,
          domain: [0, 0],
          data: [c[1], c[2]],
          order: 1,
          points: false,
          line: true,
          color: 0x00e500,
          opacity: 1
        })
        .bezier({
          id: 'bezier-polygon-3',
          n: 64,
          domain: [0, 0],
          data: [c[2], c[3]],
          order: 1,
          points: false,
          line: true,
          color: 0x00e500,
          opacity: 1
        })
      }
    };

    var attach2 = function(step) {
      mathbox.animate('#bezier-curve', { domain: [0, 1] }, { duration: 500 });
    };
    var detach2 = function(step) {
      mathbox.animate('#bezier-curve', { domain: [0, 0] }, { duration: 500 });
    };
    var attach3 = function(step) {
      mathbox.animate('#bezier-points', { opacity: 1 }, { duration: 500 });
    };
    var detach3 = function(step) {
      mathbox.animate('#bezier-points', { opacity: 0 }, { duration: 500 });
    };
    var attach4 = function(step) {
      mathbox.animate('#bezier-curve', { domain: [1,1] }, { duration: 500 });
    };
    var detach4 = function(step) {
      mathbox.animate('#bezier-curve', { domain: [0,1] }, { duration: 500 });
    };
    var attach5 = function(step) {
      mathbox.animate('#bezier-polygon-1', { domain: [0,1] }, { duration: 200 });
      mathbox.animate('#bezier-polygon-2', { domain: [0,1] }, { duration: 200, delay: 200 });
      mathbox.animate('#bezier-polygon-3', { domain: [0,1] }, { duration: 200, delay: 400 });
    };
    var detach5 = function(step) {
      mathbox.animate('#bezier-polygon-3', { domain: [0,0] }, { duration: 200 });
      mathbox.animate('#bezier-polygon-2', { domain: [0,0] }, { duration: 200, delay: 200 });
      mathbox.animate('#bezier-polygon-1', { domain: [0,0] }, { duration: 200, delay: 400 });
    };

    return [
      { key: 'bezier-1', attach: attach1 },
      { key: 'bezier-1', attach: attach2, detachPrev: detach2 },
      { key: 'bezier-1', attach: attach3, detachPrev: detach3 },
      { key: 'bezier-1', attach: attach4, detachPrev: detach4 },
      { key: 'bezier-1', attach: attach5, detachPrev: detach5 }
    ]
  })()
);
