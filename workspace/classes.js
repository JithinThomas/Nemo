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

function Ellipse(cx, cy, rx, ry) {
  Shape.call(this);

  this.cx = cx;
  this.cy = cy;
  this.rx = rx;
  this.ry = ry;

  this.area = (Math.PI * this.rx * this.ry).toFixed(2);
  this.fill = "red";
}

Ellipse.prototype = Object.create(Shape.prototype);
Ellipse.prototype.constructor = Ellipse;
Ellipse.prototype.type = TYPE_ELLIPSE;