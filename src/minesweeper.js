/*

DESCRIPTION: MINESWEEPER

- Minesweeper w/ bash
- Dynamically create a game board (player guesses) & a bomb board
(hold bomb locations)

*/

/* CLASS FOR BOARD
1. Create supeclass: board
*/
class board {
  constructor (numberOfRows,numberOfColumns,numberOfBombs) {
    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = generatePlayerBoard(numberOfRows,numberOfColumns);
    this._bombBoard = generateBombBoard(numberOfRows,numberOfColumns,
      numberOfBombs);
  }
  get playerBoard () {
    return this._playerBoard;
  }
  /* FUNCTION TO FLIP A TILE
  1. Check if tile has already been flipped
  2. Check if the tile already has a bomb in it
  3. Else, if no bombs, display # of adjacent bombs
  */
  flipTile (rowIndex, columnIndex) {
    // Is tile flipped?
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
      // Is there a bomb on the flipped tile?
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
      // If no bomb, state # of adjacent bombs
    } else {
      this._playerBoard[rowIndex][columnIndex] =
      this.getNumberOfNeighborBombs(rowIndex, columnIndex);
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
  getNumberOfNeighborBombs (rowIndex, columnIndex) {
    const neighbourOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],
    [1,1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    // search adjacent tiles to current tile
    neighbourOffsets.forEach(offset => {
      const neighbourRowIndex = rowIndex + offset[0];
      const neighbourColumnIndex = columnIndex + offset[1];
      // Only in adjacent tiles & tiles on the board
      if (neighbourRowIndex >= 0 && neighbourRowIndex < numberOfRows &&
      neighbourColumnIndex >= 0 && neighbourColumnIndex < numberOfColumns) {
        // check for bomb in adjacent tiles
        if (this._bombBoard[neighbourRowIndex][neighbourColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }
  hasSafeTiles () {
    return this._numberOfTiles !== this._numberOfBombs;
  }
  /* FUNCTION TO PRINT THE BOARD TO CONSOLE
  1. Print it all to the console
  */
  print () {
    console.log(board.map(row => row.join(' | ')).join('\n'));
  }
  /* FUNCTION FOR A BLANK BOARD
  1. Add an empty space to each column per row
  2. Add each row to a larger game board, constructing the player board
  */
  static generatePlayerBoard (numberOfRows, numberOfColumns) {
    // Create empty board
    let board = [];
    // For each row, create columns and push ' '
    for (i = 0; i < numberOfRows; i++) {
      let row = [];
      for (j = 0; j < numberOfColumns; j++) {
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
  static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
    // Create empty board
    let board = [];
    // For each row, create columns and push ' '
    for (i = 0; i < numberOfRows; i++) {
      let row = [];
      for (j = 0; j < numberOfColumns; j++) {
        row.push(null);
      }
      board.push(row);
    }
    // Bomb counter (takes from numberOfBombs parameter)
    // After learning control flow: stop bombs from replacing existing bombs
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      // Randomize bomb placement
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      // If tile doesn't already have a bomb, then it is possible to place a bomb
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return board;
  }
}




















// TEST FUNCTIONS
// New variables for player board and bomb board functions
let playerBoard = generatePlayerBoard(4,4);
let bombBoard = generateBombBoard(4,4,5);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

// User input section (flipping tiles)
console.log('Updated Player Board:')
flipTile(playerBoard, bombBoard, 1, 1);
printBoard(playerBoard);
