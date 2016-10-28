'use strict';

describe('Controller: minesweeper', function () {

  beforeEach(module('Minesweeper'));
  beforeEach(module('underscore'));

  var controller;
  var scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('minesweeper', { $scope: scope });
  }));

  describe('On instance', function () {
    // it('should set "controller_loaded" variable in scope', function () {
    //   expect(scope.controller_loaded).toEqual([[1, 0, 0], [0, 0, 0], [0, 1, 0]]);
    // });
    // [[1, 0, 0], [0, 0, 0], [0, 1, 0]]
    var testMatrix = [['M', 0, 0], [0, 0, 0], [0, 'M', 0]];

    it('should verify if matrix is a 3x3 and has 2 mines', function () {
      expect(scope.matrix).toEqual(testMatrix);
    });

    it('test_click on point 0 0', function() {
      expect(scope.test_click(0,0)).toBe('M');
    });

    it('should render all map', function () {
      expect(scope.mines_around_position(testMatrix).toEqual([['M', 1, 0], [2, 2, 1], [1, 'M', 1]]));
    });

    // xit('point 1, 2 has to return 1', function() {
    //   expect(scope.mines_around_position(1, 2)).toBe(1);
    // });
  });

  // describe('For minesweeper', function () {
  //   it('it will test in matrix A has corrects numbers', function () {
  //     expect(scope.controller_loaded).toContain()
  //   });
  //
  // });

  describe('when going to /minesweeper', function () {

    var route, location, rootScope, httpBackend;

    beforeEach(inject(function ($route, $location, $rootScope, $httpBackend) {
      route = $route;
      location = $location;
      rootScope = $rootScope;
      httpBackend = $httpBackend;

      httpBackend.when('GET', 'scripts/mines/views/minesweeper.html').respond('<div></div>');
    }));

    afterEach(function () {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should use minesweeper.html and controller', function () {
      expect(route.current).toBeUndefined();

      location.path('/minesweeper');

      httpBackend.flush();

      expect(route.current.templateUrl).toBe('scripts/mines/views/minesweeper.html');
      expect(route.current.controller).toBe('minesweeper');
    });
  });

});
