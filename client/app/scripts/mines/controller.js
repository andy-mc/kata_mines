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
    var rows_len = matrix.length;
    var col_len = matrix[0].length;

    var mines = getMinesPositions(matrix);

    mines.forEach(function(mine) {
      var x = mine[0];
      var y = mine[1];

      if (x-1 >= 0 && y-1 >= 0) {
          matrix[x-1][y-1] += 1;
      }
      if (x-1 >= 0) {
          matrix[x-1][y] += 1;
      }
      if (x-1 >= 0 && y+1 < col_len) {
          matrix[x-1][y+1] += 1;
      }
      if ( y-1 >= 0) {
          matrix[x][y-1] += 1;
      }
      if (y+1 < col_len) {
          matrix[x][y+1] += 1;
      }
      if (x+1 < rows_len &&  y-1 >= 0) {
          matrix[x+1][y-1] += 1;
      }
      if (x+1 < rows_len) {
          matrix[x+1][y] += 1;
      }
      if (x+1 < rows_len && y+1 < col_len) {
          matrix[x+1][y+1] += 1;
      }
    });
    /* Clean matrix where mines overlap given values like
    M1111 and replace it for a single M */
    mines.forEach(function(mine) {
      var x = mine[0];
      var y = mine[1];
      matrix[x][y] = 'M';
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
