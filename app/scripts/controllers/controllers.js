angular.module('YHA.controllers')
    .controller('IntrospectionController', function($rootScope, $scope, YHARecords) {
        var promise = YHARecords.introspection();
        promise.then(function(result) {
            $scope.introspection = result;
        }, function(error) {
            $scope.record = {};
            errorBroadcast("FAILED to load introspection", $rootScope);
        });
    })
    .controller('DashboardController', function($rootScope, $scope, YHARecords) {
        var promise = YHARecords.dashboard();
        promise.then(function(result) {
            $scope.dashboard = result;
        }, function(error) {
            $scope.record = {};
            errorBroadcast("FAILED to load dashboard", $rootScope);
        });
    })
    .controller('SearchController', function($rootScope, $scope, $location, YHARecords) {
        var promise = YHARecords.dropdowns("usStates");
        promise.then(function(result) {
            $scope.usStates = result.options;
        }, function(error) {
            $scope.usStates = {};
            errorBroadcast("FAILED to load US States", $rootScope);
        });

        $scope.handleSearch = function() {
            var promise = YHARecords.search(clearSearchBlanks($scope.search));
            promise.then(function(result) {
               $location.path('/search');
               $rootScope.records = result;
            }, function(error) {
                console.log(error);
                errorBroadcast("An error occurred while searching", $rootScope);
            });
        };
    })
    .controller('QueueController', function($rootScope, $scope, $routeParams, $location, YHARecords) {

        $scope.loadRecords = function() {
            $routeParams.currentPage = $scope.currentPage;
            var promise = YHARecords.list($routeParams);
            promise.then(function(response) {
                $scope.records = response.data;

                $scope.totalRecords = response.headers['x-total-count'];
                $scope.recordsPerPage = response.headers['x-per-page'];
                $scope.currentPage = response.headers['x-current-page'];

                $scope.setPagerValues();

            }, function(error) {
                $scope.records = {};
                $scope.totalRecords = 0;
                $scope.recordsPerPage = 0;
                $scope.currentPage = 0;
                errorBroadcast("FAILED to load members", $rootScope);
            });
        };

        $scope.selectPage = function(pageNo) {
            $scope.currentPage = pageNo;
            $scope.loadRecords();
        };

        $scope.setPagerValues = function() {
            $scope.pagerEnd = ($scope.currentPage === 1) ? $scope.recordsPerPage : ($scope.currentPage * $scope.recordsPerPage);
            $scope.pagerStart = ($scope.currentPage === 1) ? 1 : ($scope.pagerEnd - $scope.recordsPerPage + 1);
        }

        $scope.selectPage(1);

        $scope.handleRowClick = function(id) {
          $location.path('/view/'+id);
        };


    })
    .controller('ViewController', function($rootScope, $scope, $location, $routeParams, YHARecords) {
        $scope.pageDetails = {action: 'Viewing'};

        var promise = YHARecords.find($routeParams.id);
        promise.then(function(result) {
            $scope.record = result;
        }, function(error) {
            console.log(error);
            $scope.record = {};
            errorBroadcast("FAILED to load record", $rootScope);
        });

        $scope.handleRecordDelete = function(id) {
          var promise = YHARecords.deleteRecord(id);
          promise.then(function(result) {
            successBroadcast("Record was successfully deleted", $rootScope);
            $location.path('/queue');
          }, function(error) {
            console.log(error);
            errorBroadcast("FAILED to delete record", $rootScope);
          });
        };
    })
    .controller('EditController', function($rootScope, $scope, $timeout, $routeParams, YHARecords) {
        $scope.pageDetails = {action: 'Updating', show: true};

        var introspectionPromise = YHARecords.introspection();
        introspectionPromise.then(function(result) {

            var dropdowns = result.dropdowns;
            $scope.usStates = getDropdown(dropdowns, 'usStates');

        }, function(error) {
            errorBroadcast("FAILED to load introspection", $rootScope);
        });

        var promise = YHARecords.find($routeParams.id);
        promise.then(function(result) {
          $scope.record = result;
        }, function(error) {
          console.log(error);
          $scope.record = {};
          errorBroadcast("FAILED to load record", $rootScope);
        });

        $scope.goBack = function() {
            window.history.back();
        }

        $scope.handleSubmit = function(id) {
          var promise = YHARecords.update($scope.record);
          promise.then(function(result) {
             successBroadcast("Record was successfully saved", $rootScope);
          }, function(error) {
            console.log(error);
             errorBroadcast("Record FAILED to save", $rootScope);
          });
        };
    })
    .controller('NewController', function($rootScope, $scope, $timeout, $location, YHARecords) {
        $scope.pageDetails = {action: 'Creating', show: false};
        $scope.record = {};

        var introspectionPromise = YHARecords.introspection();
        introspectionPromise.then(function(result) {

            var dropdowns = result.dropdowns;
            $scope.usStates = getDropdown(dropdowns, 'usStates');

        }, function(error) {
            //$scope.record = {};
            errorBroadcast("FAILED to load introspection", $rootScope);
        });

        $scope.goBack = function() {
          window.history.back();
        }

        $scope.handleSubmit = function() {
            var promise = YHARecords.create($scope.record);
            promise.then(function(result) {
                successBroadcast("Record was successfully created", $rootScope);
                $location.path('/view/'+result.id);
            }, function(error) {
                console.log(error);
                errorBroadcast("Record FAILED to save", $rootScope);
            });
        };
    })
    .controller('AlertsController', function($rootScope, $timeout, $scope) {
        $rootScope.$on("alert-generated", function (event, data) {
            $scope.alerts = [{type:data.alertType, msg: data.message}];
            $timeout(function() {
                $scope.closeAlert(0);
            }, 3000);
            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };
        });
    })
    .controller('MemberSinceController', function($scope, $timeout) {
        $scope.openDatepicker = function() {
            $timeout(function() {
                $scope.opened = !$scope.opened;
            });
        };
    })
    .controller('DobController', function($scope, $timeout) {
        $scope.openDatepicker = function() {
            $timeout(function() {
                $scope.opened = !$scope.opened;
            });
        };
    });
