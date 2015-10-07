

var totalDiffX = 0;

function dragmove1(d) {
  var cx = 500;
  var rx = 100;
  totalDiffX += d3.event.dx;

  d3.select("#c-4").attr("cx", cx + totalDiffX);
  d3.select("#c-3").attr("cx", cx - totalDiffX);
  d3.select("#c-2").attr("rx", rx + Math.abs(totalDiffX));
}

function test1() {
  test2();
  test3();
}

function test2() {
  var drag = d3.behavior.drag().on("drag", dragmove1);
  d3.select("#c-4").call(drag);
}

function test3() {
  function onStart(x, y, evt) { }
  function onEnd(evt) { }

  function onMoveC2(dx, dy, x, y, evt) { }
  function onMoveC3(dx, dy, x, y, evt) { }

  function onMoveC4(dx, dy, x, y, evt) { 
    console.log("c4");

    c2.attr("rx", rx + Math.abs(dx));
    c3.attr("cx", cx - dx);
    c4.attr("cx", cx + dx);
  }

  var cx = 200;
  var cy = 150;
  var rx = 100;
  var ry = 100;
  var rc = 5;
  var totalTranslateX = 0;

  var r = Raphael(900, 250, 750, 300);
  var c2 = r.ellipse(cx, cy, rx, ry).attr({ stroke: "green", fill: "lightgrey" });
  var c3 = r.circle(cx, cy, rc).attr({ fill: "darkgreen" });
  var c4 = r.circle(cx, cy, rc).attr({ fill: "darkgreen" });

  c2.drag(onMoveC2, onStart, onEnd, c2);
  c3.drag(onMoveC3, onStart, onEnd, c3);
  c4.drag(onMoveC4, onStart, onEnd, c4);

  c2.click(function(e) {
    var p = { x: e.offsetX, y: e.offsetY };
    var f1 = { x: c3.attr("cx"), y: c3.attr("cy") }
    var f2 = { x: c4.attr("cx"), y: c4.attr("cy") }

    var d1 = dist( p, f1 );
    var d2 = dist( p, f2 );
    var s = d1 + d2;

    if ( Math.abs(s - (rx * 2)) < 15 ) {
      var p0 = c2.getPointAtLength(0);
      var tmp = dist(p0, p);
      var m = c2.getPointAtLength( gradSearch(c2, p) );
      r.circle(m.x, m.y, 5);
    }
  });
}

function gradSearch(p, pt) {
  var totLen = p.getTotalLength();
  var searchDl = 1;
  var l0 = totLen;
  var l1 = l0,
      dist0 = dist(p.getPointAtLength(l0 % totLen), pt),
      dist1,
      searchDir;

  if (dist(p.getPointAtLength((l0 - searchDl) % totLen), pt) > 
     dist(p.getPointAtLength((l0 + searchDl) % totLen), pt)) {
      searchDir = searchDl;
  } else {
      searchDir = -searchDl;
  }

  l1 += searchDir;
  dist1 = dist(p.getPointAtLength(l1 % totLen), pt);
  while (dist1 < dist0) {
      dist0 = dist1;
      l1 += searchDir;
      dist1 = dist(p.getPointAtLength(l1 % totLen), pt);
  }
  l1 -= searchDir;
  
  return (l1 % totLen);
};

function dist(pt1, pt2) {
  var dx = pt1.x - pt2.x;
  var dy = pt1.y - pt2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

function attachMarkerToShape(raphInstance, shape, ptAttrs) {
  var pt = shape.getPointAtLength(0);
  var e = raphInstance.ellipse(pt.x, pt.y, 4, 4).attr(ptAttrs);

  return e;
}

function enableMarkerDrag(shape, marker) {
  function start() {
      // storing original coordinates
      marker.ox = marker.attr("cx");
      marker.oy = marker.attr("cy");
      marker.attr({opacity: 1});
  };

  function move(dx, dy) {
      var tmpPt = {
          x : marker.ox + dx, 
          y : marker.oy + dy
      };
      // move will be called with dx and dy
      l = gradSearch(l, tmpPt);
      pt = shape.getPointAtLength(l);
      marker.attr({cx: pt.x, cy: pt.y});
  };

  function up() {
      // restoring state
      marker.attr({opacity: 1});
  };

  function gradSearch(l0, pt) {
      l0 = l0 + totLen;
      var l1 = l0,
          dist0 = dist(shape.getPointAtLength(l0 % totLen), pt),
          dist1,
          searchDir;

      if (dist(shape.getPointAtLength((l0 - searchDl) % totLen), pt) > 
         dist(shape.getPointAtLength((l0 + searchDl) % totLen), pt)) {
          searchDir = searchDl;
      } else {
          searchDir = -searchDl;
      }

      l1 += searchDir;
      dist1 = dist(shape.getPointAtLength(l1 % totLen), pt);
      while (dist1 < dist0) {
          dist0 = dist1;
          l1 += searchDir;
          dist1 = dist(shape.getPointAtLength(l1 % totLen), pt);
      }
      l1 -= searchDir;
      
      return (l1 % totLen);
  };

  var searchDl = 1;
  var l = 0;
  var totLen = shape.getTotalLength();

  shape.mouseover(start);
  shape.mouseout(up);
  shape.mousemove(function(e) {
    var dx = e.offsetX - shape.attr("cx");
    var dy = e.offsetY - shape.attr("cy");
    move(dx, dy);
  });
}