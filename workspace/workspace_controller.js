
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

  $scope.addShape = function() {
    $scope.c += 20;
    $scope.shapesList.push( new Ellipse( $scope.c, $scope.c, $scope.r, $scope.r ));
    
    var i = rand( $scope.shapesList.length );
    var s = $scope.shapesList[i];
    s.cx = $scope.c;

    var j = rand( colors.length );
    s.fill = colors[j];
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