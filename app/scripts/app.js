angular.module('YHA', ['ui.bootstrap', 'YHA.filters', 'YHA.controllers', 'YHA.services', 'YHA.directives']).config(function ($tooltipProvider, $routeProvider) {
    $tooltipProvider.setTriggers({
        'mouseenter': 'mouseleave',
        'click': 'click',
        'focus': 'blur',
        'never': 'blur' // <- This ensures the tooltip will go away on mouseleave
    });

    $routeProvider.
        when('/', {
            controller: 'DashboardController',
            templateUrl: 'views/dashboard.html'
        }).
        when('/queue', {
            controller: 'QueueController',
            templateUrl: 'views/queue.html'
        }).
        when('/search', {
            controller: 'SearchController',
            templateUrl: 'views/queue.html'
        }).
        when('/view/:id', {
            controller: 'ViewController',
            templateUrl: 'views/view.html'
        }).
        when('/edit/:id', {
            controller: 'EditController',
            templateUrl: 'views/yhaForm.html'
        }).
        when('/new', {
            controller: 'NewController',
            templateUrl: 'views/yhaForm.html'
        }).
        when('/describeYourself', {
            controller: 'IntrospectionController',
            templateUrl: 'views/introspection.html'
        }).
        otherwise({
            redirectTo: '/'
        });
});

angular.module('YHA.controllers', []);
angular.module('YHA.filters', []);
angular.module('YHA.services', []);
angular.module('YHA.directives', []);

