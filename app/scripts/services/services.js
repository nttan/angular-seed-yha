angular.module('YHA.services', [])
    .factory('YHARecords', function($http, $q) {
    var items = {};

    var crudUrl = appConfig.baseUrl + "/api" + "/yhaRecords";
    var dashboardUrl = appConfig.baseUrl + "/data" + "/yhaDashboard";
    var searchUrl = appConfig.baseUrl + "/data" + "/yhaSearch";
    var introspectionUrl = appConfig.baseUrl + "/data" + "/describeYourself";
    var dropdownUrl = appConfig.baseUrl + "/api" + "/dropdowns";

    // GET search records
    // TODO - this could be done by list I think
    items.search = function(searchParams) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: searchUrl,
            params: searchParams
        }).success(function(data, status) {
                deferred.resolve(data);
            }).error(function(data, status) {
                console.log("error getting data from server: " + status);
                deferred.reject(data);
            });
        return deferred.promise;
    }

    // Introspection
    items.introspection = function() {
        var deferred = $q.defer();
        $http.get(introspectionUrl).success(function(data, status) {
            deferred.resolve(data);
        }).error(function(data, status) {
                console.log("error getting data from server: " + status);
                deferred.reject(data);
            });
        return deferred.promise;
    }

    // Dashboard
    items.dashboard = function() {
        var deferred = $q.defer();
        $http.get(dashboardUrl).success(function(data, status) {
            deferred.resolve(data);
        }).error(function(data, status) {
                console.log("error getting data from server: " + status);
                deferred.reject(data);
            });
        return deferred.promise;
    }

    // GET returns all records
    items.list = function(params) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: crudUrl,
            params: params
        }).success(function(data, status, headers, config) {
            var results = [];
            results.data = data;
            results.headers = headers();
            results.status = status;
            results.config = config;
            deferred.resolve(results);
        }).error(function(data, status) {
            console.log("error getting data from server: " + status);
            deferred.reject(data);
        });
        return deferred.promise;
    }

    // GET returns one record
    items.find = function(id) {
      var deferred = $q.defer();
      $http.get(crudUrl + "/" + id).success(function(data, status) {
        deferred.resolve(data);
      }).error(function(data, status) {
        console.log("error getting data from server: " + status);
        deferred.reject(data);
      });
      return deferred.promise;
    }

    // POST updates record
    items.update = function(formData) {
      var deferred = $q.defer();
      $http({
          method: 'POST',
          url: crudUrl + "/" + formData.id,
          data: formData
      }).success(function(data, status) {
        deferred.resolve(data);
      }).error(function(data, status) {
        console.log("error getting data from server: " + status);
        deferred.reject(data);
      });
      return deferred.promise;
    }

    // POST creates record
    items.create = function(formData) {
        var deferred = $q.defer();
        formData.dateAdded = dateToString(new Date());
        $http({
            method: 'POST',
            url: crudUrl,
            data: formData
        }).success(function(data, status) {
                deferred.resolve(data);
            }).error(function(data, status) {
                console.log("error getting data from server: " + status);
                deferred.reject(data);
            });
        return deferred.promise;
    }

    // DELETE destroys record
    items.deleteRecord = function(id) {
        var deferred = $q.defer();
        $http({
            method: 'DELETE',
            url: crudUrl + "/" + id
        }).success(function(data, status) {
                deferred.resolve(data);
            }).error(function(data, status) {
                console.log("error getting data from server: " + status);
                deferred.reject(data);
            });
        return deferred.promise;
    }

    items.dropdowns = function (id) {
        var deferred = $q.defer();
        $http.get(dropdownUrl + "/" + id).success(function (data, status) {
            deferred.resolve(data);
        }).error(function (data, status) {
            console.log("error getting data from server: " + status);
            deferred.reject(data);
        });
        return deferred.promise;
    };

    return items;
});