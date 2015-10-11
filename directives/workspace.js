
function removeShapes(canvas) {
  canvas.clear();
}

function drawShapes(canvas, shapes) {
  shapes.forEach(function(s) {
    canvas.ellipse( s.cx, s.cy, s.rx, s.ry ).attr({ fill: "darkgreen" });;
  });
}

directivesModule.directive('workspace', [function() {
  return {
    restrict: 'EA',

    scope: {
      shapes: '=' // bi-directional data-binding
    },

    link: function(scope, element, attrs) {
      scope.canvas = Raphael(100, 10, 750, 300);

      scope.$watchCollection('shapes', function(newVal, oldVal) {
        removeShapes(scope.canvas);
        drawShapes(scope.canvas, newVal);
      }, true);
    }
  };
}]);