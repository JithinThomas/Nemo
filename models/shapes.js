//==============================================
// Constants
//==============================================

var TYPE_GENERIC = 0;
var TYPE_ELLIPSE = 1;

//==============================================
// Global variables
//==============================================

var shapeId = 0;

//==============================================
// Shape class
//==============================================

function Shape() {
  this.id = shapeId++;
}
Shape.prototype.type = TYPE_GENERIC;

//==============================================
// Ellipse class
//==============================================

function Ellipse(cx, cy, rx, ry, displayAttrs) {
  Shape.call(this);

  this.cx = cx;
  this.cy = cy;
  this.rx = rx;
  this.ry = ry;
  this.fill = getOrElse(displayAttrs, "fill", "red");
  this.enableRadiusChange = getOrElse(displayAttrs, "enableRadiusChange", false);
}

Ellipse.prototype = Object.create(Shape.prototype);
Object.defineProperties(Ellipse.prototype, {
  constructor : {
    value: Ellipse
  },
  type : {
    value: TYPE_ELLIPSE
  },
  equation : {
    "get": function() {return "{{(x-" + this.cx + ")^2} \\over (" + this.rx + ")^2} + {{(y-" + this.cy + ")^2} \\over (" + this.ry + ")^2} = 1";}
  },
  area : {
    "get": function() {return (Math.PI * this.rx * this.ry).toFixed(2);}
  },
  areaDetail : {
    "get": function() {
      return "\\begin{align}\
      &= \\pi*(" + this.rx + ")*(" + this.ry + ")\\\\\
      &= " + this.area + "\
      \\end{align}";
    }
  }
});

//==============================================
// Helper functions
//==============================================

function getOrElse(obj, property, defaultVal) {
  return (obj && obj[property]) ? obj[property] : defaultVal;
}