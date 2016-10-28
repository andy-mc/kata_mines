'use strict';

angular.module('Minesweeper')
.controller('minesweeper', function ($scope) {
  // $scope.controller_loaded = [['M', 1, 0], [2, 2, 1], [1, 'M', 1]];

  $scope.matrix = [['M', 0, 0], [0, 0, 0], [0, 'M', 0]];

  $scope.test_click = function(x, y) {
    return $scope.matrix[x][y];
  };

  $scope.mines_around_position = function(matrix) {
    console.log(matrix);
    matrix.forEach(function(row, x) {
      row.forEach(function(element, y){
        if(element === 'M') {
          console.log(element, x, y);
          if ( (x-1) >= 0 && (y-1) >= 0) {
           $scope.matrix[x-1][y-1] += 1;
         }
         if ( (x-1) >= 0 && (y) >= 0) {
          $scope.matrix[x-1][y] += 1;
         }
         if ( (x-1) >= 0 && (y+1) <= 3) {
          $scope.matrix[x-1][y+1] += 1;
         }
         if ( (x) >= 0 && (y-1) >= 0) {
          $scope.matrix[x][y-1] += 1;
         }
         if ( (x) >= 0 && (y+1) <= 3) {
          $scope.matrix[x][y+1] += 1;
         }
         if ( (x+1) <= 3 && (y-1) >= 0) {
          $scope.matrix[x+1][y-1] += 1;
         }
         if ( (x+1) <= 3 && (y) >= 0) {
          $scope.matrix[x+1][y] += 1;
         }
         if ( (x+1) >= 0 && (y+1) >= 0) {
          $scope.matrix[x+1][y+1] += 1;
         }
        }
      });
    });
    console.log(matrix);
    return matrix;
  };
})


.config(function ($routeProvider) {
  $routeProvider
  .when('/minesweeper', {
    templateUrl: 'scripts/mines/views/minesweeper.html',
    controller: 'minesweeper'
  });
});
