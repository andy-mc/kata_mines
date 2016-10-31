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

    it('should set "controller_loaded" variable in scope', function () {
      expect(scope.controller_loaded).toContain('loaded');
    });

    it('checks if a matrix is a list', function () {
      expect(Object.prototype.toString.call(scope.matrix)).toContain('Array');
    });

    it('checks if boomCheck("M") is true', function () {
      expect(scope.boomCheck('M')).toBe(true);
    });

    it('check if "generate_clues(matrix)" give correct clues', function () {
      var testMatrix;
      // test the matrix given in the kata
      testMatrix = [['M', 0, 0], [0, 0, 0], [0, 'M', 0]];
      expect(scope.generate_clues(testMatrix))
        .toEqual([ ['M', 1, 0], [2, 2, 1], [1, 'M', 1] ]);
      // matrix 2x2 with 1 mine("M")
      testMatrix = [[0, 'M'], [0, 0]];
      expect(scope.generate_clues(testMatrix))
      .toEqual([[1,'M'],[1,1]]);
      // matrix 4x3 with 1 mine("M")
      testMatrix = [[0, 'M', 0], [0, 0, 'M'], [0, 'M', 0], [0, 0, 'M']];
      expect(scope.generate_clues(testMatrix))
      .toEqual([[1, 'M', 2], [2, 3, 'M'], [1, 'M', 3], [1, 2, 'M']]);

      // << Extreme Cases >>
      // All full of mines
      testMatrix = [['M', 'M', 'M'], ['M', 'M', 'M'], ['M', 'M', 'M']];
      expect(scope.generate_clues(testMatrix))
        .toEqual([['M', 'M', 'M'], ['M', 'M', 'M'], ['M', 'M', 'M']]);
      // no mines at all
      testMatrix = [[0,0,0], [0,0,0], [0,0,0]];
      expect(scope.generate_clues(testMatrix))
        .toEqual([[0,0,0], [0,0,0], [0,0,0]]);
      // 1 mine in every corner
      testMatrix = [['M',0,'M'], [0,0,0], ['M',0,'M']];
      expect(scope.generate_clues(testMatrix))
        .toEqual([['M',2,'M'], [2,4,2], ['M',2,'M']]);
    });
  });

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
