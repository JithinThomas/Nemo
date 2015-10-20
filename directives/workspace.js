
//===========================================
// Workspace directive definition
//===========================================

directivesModule.directive('workspace', [function() {
  return {
    restrict: 'EA',

    scope: {
      shapes: '=', // bi-directional data-binding
      selectedShape: '='
    },

    link: function(scope, element, attrs) {
      var w = $("#workspace").width();
      var h = $("#workspace").height() - $("#toolbar").height();

      var ws = new Workspace(scope, element[0], w, h);

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

function Workspace(scope, container, width, height) {
  this.scope = scope;
  this.canvas = Raphael(container, width, height);
  this.origin = { "x": width/2, "y": height/2 };
}

Workspace.prototype.drawCoordinateAxes = function() {
  var parentWidth = this.canvas.width;
  var parentHeight = this.canvas.height;

  this.canvas
      .path("M" + parentWidth/2 + ",0 L" + parentWidth/2 + "," + parentHeight)
      .attr({ "stroke": "black", "stroke-width": 3 });

  this.canvas
      .path("M0," + parentHeight/2 + ", L" + parentWidth + "," + parentHeight/2)
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

}

Workspace.prototype.redrawEllipse = function(attrs) {
  var self = this;
  var id = "s-" + attrs.id;
  $("#" + id).remove();

  var ell = this.canvas
    .ellipse(
        attrs.cx + this.origin.x, 
        attrs.cy + this.origin.y,
        attrs.rx, attrs.ry
    ).attr({ 
      fill: attrs.fill 
    });

  var className = "shape";
  if (self.scope.selectedShape.id == attrs.id) {
    className += " selected-shape";
  }

  $(ell.node)
    .attr("id", id)
    .attr("class", className)
    .click(function(evt) { 
      self.shapeClickHandler(evt, ell);
    });

  if (attrs.enableRadiusChange) {
    this.enableRadiusChangeForEllipse(ell);
  }
}

Workspace.prototype.enableRadiusChangeForEllipse = function(shape) {
  function onStart(x, y, evt) { 
    rx0 = shape.attrs.rx;
    ry0 = shape.attrs.ry;
  }

  function onEnd(evt) { }

  function axisChangeHandler(markerId) {
    var sign = (markerId <= 1) ? 1 : -1;
    var isMajorAxisChange = (markerId % 2 == 0);
    var r0 = isMajorAxisChange ? rx0 : ry0;
    var prop = isMajorAxisChange ? "rx" : "ry";

    return function(dx, dy, x, y, evt) {
      var n = $(shape.node);
      var shapeId = cssIdToShapeId(n[0].id);
      var diff = isMajorAxisChange ? dx : dy;

      if ((sign * diff) > (-1 * r0)) {
        self.scope.shapes[shapeId][prop] = r0 + (sign * diff);
      } else {
        self.scope.shapes[shapeId][prop] = Math.abs(diff + (sign * r0));
      }
      
      self.scope.$apply();
    }
  }

  var self = this;
  var n = $(shape.node);
  var shapeId = cssIdToShapeId(n[0].id);
  var dragMarkerClass = "drag-" + shapeId;
  $("." + dragMarkerClass).remove();

  var attrs = shape.attrs;
  var rx0 = attrs.rx;
  var ry0 = attrs.ry;

  for (var i = 0; i < 4; i++) {
    var x = attrs.cx + attrs.rx * Math.cos((i * Math.PI) / 2);
    var y = attrs.cy + attrs.ry * Math.sin((i * Math.PI) / 2);
    var c = this.canvas.circle(x, y, 5);
    $(c.node).attr({
      "id" : "drag-s" + shapeId + "-m" + i,
      "class": dragMarkerClass + " marker " + "c-" + i 
    });

    c.drag(axisChangeHandler(i), onStart, onEnd);
  }
}

Workspace.prototype.shapeClickHandler = function(evt, shape) {
  $(".selected-shape").attr("class", "shape");

  var n = $(shape.node);
  n.attr({ class: "shape selected-shape" });

  var shapeId = cssIdToShapeId(n[0].id);
  this.scope.selectedShape = this.scope.shapes[shapeId];
  this.scope.$apply();
}

Workspace.prototype.removeShapes = function() {
  this.canvas.clear();
}

//===========================================
// Helper functions
//===========================================

function cssIdToShapeId(cssId) {
  return parseInt(cssId.substring(2));
}