describe('NewController', function() {
    var scope, controller, mockHttpBackend, membersService;

    beforeEach(module('MoWW.services'));
    beforeEach(module('MoWW.controllers'));


    beforeEach(inject(function($rootScope, $httpBackend, $controller, MowwMembers) {
        membersService = MowwMembers;
        mockHttpBackend = $httpBackend;
        scope = $rootScope.$new;
        controller = $controller;
    }));

    it("should contain page details", function() {
        controller('NewController', {$scope: scope, MowwMembers:membersService});
        expect(scope.pageDetails.action).toBe("Creating");
    });
});