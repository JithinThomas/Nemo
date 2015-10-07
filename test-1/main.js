
var x = 500;
var y = 100;
var a = 200;
var b = 100;
var t = 0;

function dragmove(d) {
  d3.select(this)
    .attr("cx", d3.event.x)
    .attr("cy", d3.event.y);
}

function main() {
  //test();
  test1();

  var drag = d3.behavior.drag()
    .on("drag", dragmove);

  d3.select("#circle-1")
    .call(drag);

  $("#ell-1").click(function(e) {
    console.log(e);
    console.log(e.clientX);
    console.log(e.clientY);
  });

  $("#ell-1").mouseover(function(e) {
    d3.select("#workspaceSvg")
      .selectAll(".dragP")
      .data([0,1,2,3]).enter()
      .append("circle")
      .attr("class", "dragP")
      .attr("cx", function(d,i) { return x + a * Math.cos((i * Math.PI) / 2); })
      .attr("cy", function(d,i) { return y + b * Math.sin((i * Math.PI) / 2); })
      .attr("r", 5)
      .attr("fill", "black");

    var xDiff = e.offsetX - x;
    var yDiff = e.offsetY - y;
    var theta = Math.tanh(yDiff / xDiff);
    //if (theta < 0) { theta = Math.PI - theta; }

    d3.select("#workspaceSvg")
      .append("circle")
      .attr("class", "c")
      .attr("cx", x + a * Math.cos(theta))
      .attr("cy", y + b * Math.sin(theta))
      .attr("r", 5)
      .attr("fill", "black")
    });

  $("#ell-1").mouseleave(function(e) {
    d3.selectAll(".dragP").remove();
    d3.select(".c").remove();
  });
}

$(document).ready(main);

/*
d3.select("#workspaceSvg")
  .append("circle")
  .attr("class", "c")
  .attr("cx", x + a * Math.cos(t))
  .attr("cy", y + b * Math.sin(t))
  .attr("r", 5)
  .attr("fill", "black")
*/