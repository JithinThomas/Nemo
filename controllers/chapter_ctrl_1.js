'use strict';

function ChapterCntrl1($scope) {
  WorkspaceCtrl.call(this, $scope);

  var e = new Ellipse( 0, 0, 50, 20, { "fill": "green", "enableRadiusChange": true } )
  $scope.shapesList = [e];
  $scope.selectedShape = e;
}

ChapterCntrl1.prototype = Object.create(WorkspaceCtrl.prototype);