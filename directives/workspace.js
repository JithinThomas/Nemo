
//===========================================
// Workspace directive definition
//===========================================

directivesModule.directive('workspace', [function() {
  return {
    restrict: 'EA',

    scope: {
      shapes: '=' // bi-directional data-binding
    },

    link: function(scope, element, attrs) {
      var w = $("#workspace").width();
      var h = $("#workspace").height() - $("#toolbar").height();

      scope.origin = (w/2, h/2);
      scope.canvas = Raphael(element[0], w, h);

      scope.$watchCollection('shapes', function(newVal, oldVal) {
        removeShapes(scope.canvas);
        drawCoordinateAxes(scope.canvas);
        drawShapes(scope.canvas, newVal);

        for (var i = oldVal.length; i < newVal.length; i++) {
          scope.$watchCollection('shapes[' + i + ']', function(n) {
            redrawShape(scope.canvas, n)
          }, true);
        }
      }, true);

      scope.shapes.forEach(function(s, i) {
        scope.$watchCollection('shapes[' + i + ']', function(n) {
          redrawShape(scope.canvas, n)
        })
      });
    }
  };
}]);

//===========================================
// Helper functions
//===========================================

function drawCoordinateAxes(canvas) {
  var parentWidth = canvas.width;
  var parentHeight = canvas.height;

  canvas.path("M" + parentWidth/2 + ",0 L" + parentWidth/2 + "," + parentHeight)
        .attr({ "stroke": "black", "stroke-width": 3 });

  canvas.path("M0," + parentHeight/2 + ", L" + parentWidth + "," + parentHeight/2)
        .attr({ "stroke": "black", "stroke-width": 3 });
        //.attr({ "stroke": "black", "stroke-width": 3, "stroke-dasharray": "- " });

  canvas.text(parentWidth/2 + 17, parentHeight/2 - 10, "(0,0)");
}

function drawShapes(canvas, shapes) {
  shapes.forEach(function(s) {
    redrawShape(canvas, s);
  });
}

function redrawShape(canvas, attrs) {
  switch(attrs.type) {
    case TYPE_ELLIPSE: 
      redrawEllipse(canvas, attrs);
      break;
    default:
      console.error("Unrecognized shape type: " + attrs.type);
  }
}

function redrawEllipse(canvas, attrs) {
  var id = "s-" + attrs.id;
  $("#" + id).remove();

  var e = canvas.ellipse( attrs.cx, attrs.cy, attrs.rx, attrs.ry )
                .attr({ fill: attrs.fill });
  $(e.node).attr('id', id);
}

function removeShapes(canvas) {
  canvas.clear();
}