angular.module('YHA.directives')
    .directive('queueResize', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var offset = 108;
                if (attrs.pixelOffset) {
                    offset = parseInt(attrs.pixelOffset, 10);
                }
                element.css('height', $("#"+attrs.resizeTo).height()-offset + "px")
            }
        };
    });