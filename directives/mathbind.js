'use strict';

directivesModule.directive("mathBind", function() {
    return {
        restrict: "A",
        controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
            var math = null;
            $scope.$watch($attrs.mathBind, function(value) {
                // var $script = angular.element("<script type='math/tex'>")
                    // .html(value == undefined ? "" : value);
                // $element.html("");
                // $element.append($script);
                // var el = $element[0];
                // var math = MathJax.Hub.getAllJax($element[0])[0];
                // MathJax.Hub.Queue(["Typeset", MathJax.Hub, $element[0]]);
                // MathJax.Hub.Queue(["Text", math, value]);
                if (math === null) {
                    MathJax.Hub.queue.Push(function () {
                          math = MathJax.Hub.getAllJax($element[0])[0];
                          math.Text(value);
                        });
                } else {
                    math.Text(value);
                }
            });
        }]
    };
});