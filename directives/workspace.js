
directivesModule.directive('workspace', [function() {
  return {
    restrict: 'EA',

    scope: {
      shapes: '=' // bi-directional data-binding
    },

    link: function(scope, element, attrs) {
      scope.canvas = Raphael(100, 10, 750, 700);

      scope.shapes.forEach(function(s, i) {
        scope.$watchCollection('shapes[' + i + ']', function(n) {
          redrawShape(scope.canvas, n)
        })
      });

      scope.$watchCollection('shapes', function(newVal, oldVal) {
        removeShapes(scope.canvas);
        drawShapes(scope.canvas, newVal);

        for (var i = oldVal.length; i < newVal.length; i++) {
          scope.$watchCollection('shapes[' + i + ']', function(n) {
            redrawShape(scope.canvas, n)
          }, true);
        }
      }, true);
    }
  };
}]);

//===========================================
// Helper functions
//===========================================

function removeShapes(canvas) {
  canvas.clear();
}

function drawShapes(canvas, shapes) {
  shapes.forEach(function(s) {
    redrawShape(canvas, s);
  });
}

function redrawShape(canvas, s) {
  var id = "s-" + s.i;
  $("#" + id).remove();
  var e = canvas.ellipse( s.cx, s.cy, s.rx, s.ry ).attr({ fill: "darkgreen" });
  $(e.node).attr('id', id);
}