'use strict';

var myApp = angular.module('myApp', [
  'myApp.directives'
]);

function enableResizingOfCols() {
  // Refs:
  //    API: https://api.jqueryui.com/resizable/
  //    Example: http://codepen.io/barbalex/pen/ogZWNV
  $("#menu").resizable({
    handles: 'e',
    alsoResizeReverse: '#chapter'
  });

  $("#chapter").resizable({
    handles: 'e',
    alsoResizeReverse: '#workspace'
  });
}

function main() {
  //enableResizingOfCols();
}

$(document).ready(main);