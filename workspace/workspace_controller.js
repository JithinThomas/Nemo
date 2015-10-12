
myApp.controller('WorkSpaceCtrl', function($scope) {
  $scope.c = 10;
  $scope.r = 5;

  $scope.shapesList = [
    { "cx" : $scope.c, "cy" : $scope.c, "rx" : $scope.r, "ry": $scope.r, "fill": "red", "i": 0 },
    { "cx" : $scope.c, "cy" : $scope.c + 10, "rx" : $scope.r, "ry": $scope.r, "fill": "red", "i": 1 },
    { "cx" : $scope.c, "cy" : $scope.c + 20, "rx" : $scope.r, "ry": $scope.r, "fill": "red", "i": 2 },
    { "cx" : $scope.c, "cy" : $scope.c + 30, "rx" : $scope.r, "ry": $scope.r, "fill": "red", "i": 3 }
  ];

  $scope.foo = function() {
    $scope.c += 20;

    $scope.shapesList.push({
      "cx" : $scope.c, "cy" : $scope.c, "rx" : $scope.r, "ry": $scope.r, "fill": "red", "i": $scope.shapesList.length
    });
    
    var i = Math.round( Math.random() * ($scope.shapesList.length - 1));
    $scope.shapesList[i].cx = $scope.c;
  };
});