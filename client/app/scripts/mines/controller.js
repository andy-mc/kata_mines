'use strict';

angular.module('Minesweeper')
.controller('minesweeper', function ($scope) {

  $scope.controller_loaded = 'Minesweeper loaded!';

  $scope.matrix = [['M', 1, 0], [2, 2, 1], [1, 'M', 1]];

  $scope.boomCheck = function(element) {
    if (element === 'M') {
      window.alert('BOOM BOOM game over !!');
      return true;
    }
  };

  var getMinesPositions = function (matrix) {
    var mines_positions = [];
    matrix.forEach(function(row, x) {
      row.forEach(function(element, y) {
        if (element === 'M') {
            mines_positions.push([x,y]);
        }
      });
    });
    return mines_positions;
  };

  $scope.generate_clues = function(matrix) {
    var x_len = matrix.length;
    var y_len = matrix[0].length;
    var mines = getMinesPositions(matrix);
    mines.forEach(function(mine) {
      var x = mine[0];
      var y = mine[1];

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
