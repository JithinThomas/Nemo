
myApp.controller('WorkSpaceCtrl', function($scope) {
  $scope.c = 10;
  $scope.r = 5;

  $scope.shapesList = [{ "cx" : $scope.c, "cy" : $scope.c, "rx" : $scope.r, "ry": $scope.r }];

  $scope.foo = function() {
    $scope.c += 20;
    $scope.shapesList.push({
      "cx" : $scope.c, "cy" : $scope.c, "rx" : $scope.r, "ry": $scope.r
    })
  };
});