/*

DESCRIPTION: MINESWEEPER

- Minesweeper w/ bash
- Dynamically create a game board (player guesses) & a bomb board
(hold bomb locations)

*/


/* FUNCTION FOR A BLANK BOARD
1. Add an empty space to each column per row
2. Add each row to a larger game board, constructing the player board
*/
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
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
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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


/* FUNCTION TO DISPLAY THE AMT. OF ADJACENT BOMBS
1. Determine the size of a board
2. use the location of a flipped tile
3. use an array index offset system to check adjacent tiles for bombs
4. If a bomb adjacent to the clicked tile exists, record w/ counter
5. Return # of bombs adjacent to a flipped tile
*/
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighbourOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],
  [1,1]];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;
  // search adjacent tiles to current tile
  neighbourOffsets.forEach(offset => {
    const neighbourRowIndex = rowIndex + offset[0];
    const neighbourColumnIndex = columnIndex + offset[1];
    // Only in adjacent tiles & tiles on the board
    if (neighbourRowIndex >= 0 && neighbourRowIndex < numberOfRows &&
    neighbourColumnIndex >= 0 && neighbourColumnIndex < numberOfColumns) {
      // check for bomb in adjacent tiles
      if (bombBoard[neighbourRowIndex][neighbourColumnIndex] === 'B') {
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
}


/* FUNCTION TO FLIP A TILE
1. Check if tile has already been flipped
2. Check if the tile already has a bomb in it
3. Else, if no bombs, display # of adjacent bombs
*/
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  // Is tile flipped?
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has already been flipped!');
    return;
    // Is there a bomb on the flipped tile?
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
    // If no bomb, state # of adjacent bombs
  } else {
    playerBoard[rowIndex][columnIndex] =
    getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
}



/* FUNCTION TO PRINT THE BOARD TO CONSOLE
1. Print it all to the console
*/
const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
}



// TEST FUNCTIONS
let playerBoard = generatePlayerBoard(4,4);
let bombBoard = generateBombBoard(4,4,5);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

console.log('Updated Player Board:')
flipTile(playerBoard, bombBoard, 1, 1);
printBoard(playerBoard);
