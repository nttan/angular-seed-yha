describe('SearchController', function() {
    var searchParams = {firstName:'Richard'};
    var resultsData = [{firstName:'Richard', lastName:'Harris'},{firstName:'Shawn', lastName:'Spencer'}];
    var scope, controller, mockHttpBackend, membersService, rootScope;

    beforeEach(module('MoWW.services'));
    beforeEach(module('MoWW.controllers'));


    beforeEach(inject(function($rootScope, $httpBackend, $controller, MowwMembers) {
        membersService = MowwMembers;
        mockHttpBackend = $httpBackend;
        scope = $rootScope.$new;
        controller = $controller;
        rootScope = $rootScope;
    }));

    it("should contain search results", function() {
        controller('SearchController', {$scope: scope, MowwMembers:membersService});
        mockHttpBackend.expectGET('http://localhost:8080/api/mowwSearch').respond(resultsData);

        scope.handleSearch();

        mockHttpBackend.flush();
        expect(rootScope.records).toBe(resultsData);
    });
});