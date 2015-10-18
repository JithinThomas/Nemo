
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

      var ws = new Workspace(element[0], w, h);

      scope.$watchCollection('shapes', function(newVal, oldVal) {
        ws.removeShapes();
        ws.drawCoordinateAxes();
        ws.drawShapes(newVal);

        for (var i = oldVal.length; i < newVal.length; i++) {
          scope.$watchCollection('shapes[' + i + ']', function(n) {
            ws.redrawShape(n)
          }, true);
        }
      }, true);

      scope.shapes.forEach(function(s, i) {
        scope.$watchCollection('shapes[' + i + ']', function(n) {
          ws.redrawShape(n)
        })
      });
    }
  };
}]);

//===========================================
// Workspace class
//===========================================

function Workspace(container, width, height) {
  this.canvas = Raphael(container, width, height);
  this.origin = { "x": width/2, "y": height/2 };
}

Workspace.prototype.drawCoordinateAxes = function() {
  var parentWidth = this.canvas.width;
  var parentHeight = this.canvas.height;

  this.canvas.path("M" + parentWidth/2 + ",0 L" + parentWidth/2 + "," + parentHeight)
        .attr({ "stroke": "black", "stroke-width": 3 });

  this.canvas.path("M0," + parentHeight/2 + ", L" + parentWidth + "," + parentHeight/2)
        .attr({ "stroke": "black", "stroke-width": 3 });
        //.attr({ "stroke": "black", "stroke-width": 3, "stroke-dasharray": "- " });

  this.canvas.text(parentWidth/2 + 17, parentHeight/2 - 10, "(0,0)");
}

Workspace.prototype.drawShapes = function(shapes) {
  var self = this;
  shapes.forEach(function(s) {
    self.redrawShape(s);
  });
}

Workspace.prototype.redrawShape = function(attrs) {
  switch(attrs.type) {
    case TYPE_ELLIPSE: 
      this.redrawEllipse(attrs);
      break;
    default:
      console.error("Unrecognized shape type: " + attrs.type);
  }
}

Workspace.prototype.redrawEllipse = function(attrs) {
  var id = "s-" + attrs.id;
  $("#" + id).remove();

  var e = this.canvas
    .ellipse(
        attrs.cx + this.origin.x, 
        attrs.cy + this.origin.y,
        attrs.rx, attrs.ry
    ).attr({ 
      fill: attrs.fill 
    });
  $(e.node).attr('id', id);
}

Workspace.prototype.removeShapes = function() {
  this.canvas.clear();
}