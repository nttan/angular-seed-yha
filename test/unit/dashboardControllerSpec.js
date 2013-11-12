describe('DashboardController', function() {
    var dashboardData = {membersTotal: 42};
    var scope, controller, mockHttpBackend, membersService;

    beforeEach(module('MoWW.services'));
    beforeEach(module('MoWW.controllers'));


    beforeEach(inject(function($rootScope, $httpBackend, $controller, MowwMembers) {
        membersService = MowwMembers;
        mockHttpBackend = $httpBackend;
        scope = $rootScope.$new;
        controller = $controller;
    }));

    it("should contain members total", function() {
        //spyOn(membersService, 'dashboard').andCallThrough();
        mockHttpBackend.expectGET('http://localhost:8080/api/mowwDashboard').respond(dashboardData);
        controller('DashboardController', {$scope: scope, MowwMembers:membersService});
        mockHttpBackend.flush();
        expect(scope.dashboard.membersTotal).toBe(42);
    });
});