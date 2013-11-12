angular.module('YHA.directives')
    .directive('queueResize', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.css('height', $("#"+attrs.resizeTo).height()-108 + "px")
            }
        };
    });