'use strict';

angular.module('Minesweeper')
.controller('minesweeper', function ($scope) {

  $scope.controller_loaded = 'Minesweeper loaded!';
  $scope.generate_clues = function(matrix) {
    var x_len = matrix.length;
    var y_len = matrix[0].length;
    matrix.forEach(function(row, x) {
      row.forEach(function(element, y){
        if(element === 'M') {
          if (x-1 >= 0 && y-1 >= 0) {
            if(matrix[x-1][y-1] !== 'M'){
              matrix[x-1][y-1] += 1;
            }
          }
          if (x-1 >= 0) {
            if(matrix[x-1][y] !== 'M'){
              matrix[x-1][y]+= 1;
            }
          }
          if (x-1 >= 0 && y+1 < y_len) {
            if(matrix[x-1][y+1] !== 'M'){
              matrix[x-1][y+1] += 1;
            }
          }
          if ( y-1 >= 0) {
            if(matrix[x][y-1] !== 'M'){
              matrix[x][y-1] += 1;
            }
          }
          if (y+1 < y_len) {
            if(matrix[x][y+1] !== 'M'){
              matrix[x][y+1] += 1;
            }
          }
          if (x+1 < x_len &&  y-1 >= 0) {
            if(matrix[x+1][y-1] !== 'M'){
              matrix[x+1][y-1] += 1;
            }
          }
          if (x+1 < x_len) {
            if(matrix[x+1][y] !== 'M'){
              matrix[x+1][y] += 1;
            }
          }
          if (x+1 < x_len && y+1 < y_len) {
            if(matrix[x+1][y+1] !== 'M'){
              matrix[x+1][y+1] += 1;
            }
          }
        }
      });
    });
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
