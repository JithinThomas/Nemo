'use strict';

var myApp = angular.module('myApp', [
  'ngRoute',
  'controllers',
  'myApp.directives'
]);

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'chapters/chapter-1/chapter-1.html',
        controller: 'ChapterCntrl1'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
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