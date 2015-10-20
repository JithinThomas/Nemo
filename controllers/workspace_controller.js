
var colors = ["red", "green", "blue", "yellow"];

myApp.controller('WorkSpaceCtrl', function($scope) {
  $scope.c = 0;
  $scope.r = 20;

  $scope.shapesList = [
    new Ellipse( $scope.c, $scope.c, $scope.r, $scope.r, { "fill": "blue" }),
    new Ellipse( $scope.c, $scope.c + 60, $scope.r, $scope.r, { "enableRadiusChange": true }),
    new Ellipse( $scope.c, $scope.c + 120, $scope.r, $scope.r, { "fill": "darkgreen" } ),
    new Ellipse( $scope.c, $scope.c + 180, $scope.r, $scope.r, { "fill": "yellow", "enableRadiusChange": true } )
  ];

  $scope.selectedShape = $scope.shapesList[$scope.shapesList.length - 1];

  $scope.addShape = function() {
    $scope.c += 20;

    var e = new Ellipse( $scope.c, $scope.c, $scope.r, $scope.r );
    $scope.shapesList.push( e );
    $scope.selectedShape = e;
    
    var i = rand( $scope.shapesList.length );
    var s = $scope.shapesList[i];
    s.cx = $scope.c;

    var j = rand( colors.length );
    s.fill = colors[j];
  };

  $scope.changeShape = function() {
    $scope.selectedShape.cx += 20;
    $scope.selectedShape.rx += 20;
  };

  $scope.delShape = function() {
    /*
    if ($scope.shapesList.length > 0) {
      $scope.shapesList.pop();
      $scope.c -= 20;
    }
    */
  };
});

function rand(n) {
  return Math.round( Math.random() * (n - 1));
}