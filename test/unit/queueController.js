describe('QueueController', function() {
    var queueData = [{firstName:'Richard', lastName:'Harris'}];
    var scope, controller, mockHttpBackend, membersService;

    beforeEach(module('MoWW.services'));
    beforeEach(module('MoWW.controllers'));


    beforeEach(inject(function($rootScope, $httpBackend, $controller, MowwMembers) {
        membersService = MowwMembers;
        mockHttpBackend = $httpBackend;
        scope = $rootScope.$new;
        controller = $controller;
    }));

    it("should contain a list of members", function() {
        mockHttpBackend.expectGET('http://localhost:8080/api/mowwMembers').respond(queueData);
        controller('QueueController', {$scope: scope, MowwMembers:membersService});
        mockHttpBackend.flush();
        expect(scope.records).toBe(queueData);
    });
});