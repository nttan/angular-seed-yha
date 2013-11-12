angular.module('YHA.filters')
    .filter('stringToDate', function() {
        return function(input) {
            return Date.parse(input);
        };
    });

angular.module('YHA.filters')
    .filter('camelCaseToHuman', function() {
        return function(input) {
            if (input) {
                return input.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
            }  else {
                return "";
            }
        };
    });

angular.module('YHA.filters')
    .filter('capitalizeWords', function() {
        return function(input) {
            if (input) {
                return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
            } else {
                return "";
            }
        };
    });