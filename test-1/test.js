
/* Reference: http://jsfiddle.net/fuzic/kKLtH/ */

var qw = undefined;

function test() {
    var searchDl = 1;
    var l = 0;

    // Creates canvas 320 × 200 at 10, 50
    //var r = Raphael(10, 50, 320, 200);
    var r = Raphael(900, 250, 500, 300);

    //var p = r.path("M100,100c0,50 100-50 100,0c0,50 -100-50 -100,0z").attr({stroke: "#ddf"}).attr({ id: "path-1" }),
    //var p = $("#path-1")[0],
    var p = r.ellipse(200, 150, 200, 100).attr({ stroke: "green" }).attr({ fill: "yellow" }),
    //var p = $("#ell-2")[0],
        pt = p.getPointAtLength(0),
        e = r.ellipse(pt.x, pt.y, 4, 4).attr({stroke: "none", fill: "#f00"}),
        totLen = p.getTotalLength();

    qw = p;

    function start() {
        // storing original coordinates
        this.ox = this.attr("cx");
        this.oy = this.attr("cy");
        this.attr({opacity: 1});
    };

    function move(dx, dy) {
        var tmpPt = {
            x : this.ox + dx, 
            y : this.oy + dy
        };
        // move will be called with dx and dy
        l = gradSearch(l, tmpPt);
        pt = p.getPointAtLength(l);
        this.attr({cx: pt.x, cy: pt.y});
    };

    function up() {
        // restoring state
        this.attr({opacity: 1});
    };

    function gradSearch(l0, pt) {
        l0 = l0 + totLen;
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

    e.drag(move, start, up);

    $("#path-1").mousemove(function(e) {
        console.log(e);
    })
}