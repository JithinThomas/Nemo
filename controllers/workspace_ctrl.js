'use strict';

function WorkspaceCtrl($scope) {
  var colors = ["red", "green", "blue", "yellow"];
  var c = 0;
  var r = 20;

  $scope.shapesList = [
    new Ellipse( c, c, r, r, { "fill": "blue" }),
    new Ellipse( c, c + 60, r, r, { "enableRadiusChange": true }),
    new Ellipse( c, c + 120, r, r, { "fill": "darkgreen" } ),
    new Ellipse( c, c + 180, r, r, { "fill": "yellow", "enableRadiusChange": true } )
  ];

  $scope.selectedShape = $scope.shapesList[$scope.shapesList.length - 1];

  $scope.addShape = function() {
    c += 20;

    var e = new Ellipse( c, c, r, r );
    $scope.shapesList.push( e );
    $scope.selectedShape = e;
    
    var i = rand( $scope.shapesList.length );
    var s = $scope.shapesList[i];
    s.cx = c;

    var j = rand( colors.length );
    s.fill = colors[j];
  };

  $scope.changeShape = function() {
    $scope.selectedShape.cx += 20;
    $scope.selectedShape.rx += 20;
  };

  $scope.delShape = function() {

  };
}

function rand(n) {
  return Math.round( Math.random() * (n - 1));
}