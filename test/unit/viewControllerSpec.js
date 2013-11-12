describe('ViewController', function() {
    var resultsData = {firstName:'Richard', lastName:'Harris'};
    var id = 42;
    var scope, controller, mockHttpBackend, membersService, rootScope, location, routeParams;

    beforeEach(module('MoWW.services'));
    beforeEach(module('MoWW.controllers'));


    beforeEach(inject(function($rootScope, $httpBackend, $controller, $location, $routeParams, MowwMembers) {
        membersService = MowwMembers;
        mockHttpBackend = $httpBackend;
        scope = $rootScope.$new;
        controller = $controller;
        rootScope = $rootScope;
        location = $location;
        routeParams = $routeParams;
        routeParams.id = id;
    }));

    it("should contain a record", function() {
        mockHttpBackend.expectGET('http://localhost:8080/api/mowwMembers/'+id).respond(resultsData);
        controller('ViewController', {$scope: scope, $routeParams: routeParams, $location: location, MowwMembers:membersService});
        mockHttpBackend.flush();
        expect(scope.record).toBe(resultsData);
    });
});