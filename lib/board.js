'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* CLASS FOR BOARD
1. Create supeclass: board
*/
var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',

    /* FUNCTION TO FLIP A TILE
    1. Check if tile has already been flipped
    2. Check if the tile already has a bomb in it
    3. Else, if no bombs, display # of adjacent bombs
    */
    value: function flipTile(rowIndex, columnIndex) {
      // Is tile flipped?
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
        // Is there a bomb on the flipped tile?
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
        // If no bomb, state # of adjacent bombs
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
      this._numberOfTiles--;
    }
    /* FUNCTION TO DISPLAY THE AMT. OF ADJACENT BOMBS
    1. Determine the size of a board
    2. use the location of a flipped tile
    3. use an array index offset system to check adjacent tiles for bombs
    4. If a bomb adjacent to the clicked tile exists, record w/ counter
    5. Return # of bombs adjacent to a flipped tile
    */

  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighbourOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;
      // search adjacent tiles to current tile
      neighbourOffsets.forEach(function (offset) {
        var neighbourRowIndex = rowIndex + offset[0];
        var neighbourColumnIndex = columnIndex + offset[1];
        // Only in adjacent tiles & tiles on the board
        if (neighbourRowIndex >= 0 && neighbourRowIndex < numberOfRows && neighbourColumnIndex >= 0 && neighbourColumnIndex < numberOfColumns) {
          // check for bomb in adjacent tiles
          if (_this._bombBoard[neighbourRowIndex][neighbourColumnIndex] === 'B') {
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }
    /* FUNCTION TO PRINT THE BOARD TO CONSOLE
    1. Print it all to the console
    */

  }, {
    key: 'print',
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
    /* FUNCTION FOR A BLANK BOARD
    1. Add an empty space to each column per row
    2. Add each row to a larger game board, constructing the player board
    */

  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      // Create empty board
      var board = [];
      // For each row, create columns and push ' '
      for (var i = 0; i < numberOfRows; i++) {
        var row = [];
        for (var j = 0; j < numberOfColumns; j++) {
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }
    /* FUNCTION FOR BOMB BOARD
    1. Dynamically generate bomb position on board
    2. Create game board of specified size
    3. Add bombs to random squares on game board
    */

  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      // Create empty board
      var board = [];
      // For each row, create columns and push ' '
      for (var i = 0; i < numberOfRows; i++) {
        var row = [];
        for (var j = 0; j < numberOfColumns; j++) {
          row.push(null);
        }
        board.push(row);
      }
      // Bomb counter (takes from numberOfBombs parameter)
      // After learning control flow: stop bombs from replacing existing bombs
      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        // Randomize bomb placement
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        // If tile doesn't already have a bomb, then it is possible to place a bomb
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }
      return board;
    }
  }]);

  return Board;
}();