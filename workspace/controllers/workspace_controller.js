
var colors = ["red", "green", "blue", "yellow"];

myApp.controller('WorkSpaceCtrl', function($scope) {
  $scope.c = 0;
  $scope.r = 5;

  $scope.shapesList = [
    new Ellipse( $scope.c, $scope.c, $scope.r, $scope.r ),
    new Ellipse( $scope.c, $scope.c + 10, $scope.r, $scope.r ),
    new Ellipse( $scope.c, $scope.c + 20, $scope.r, $scope.r ),
    new Ellipse( $scope.c, $scope.c + 30, $scope.r, $scope.r )
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