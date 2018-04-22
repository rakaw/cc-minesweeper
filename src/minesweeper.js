/*

DESCRIPTION: MINESWEEPER

- Minesweeper w/ bash
- Dynamically create a game board (player guesses) & a bomb board
(hold bomb locations)

*/


/* CONST FUNCTION FOR A BLANK BOARD
1. Add an empty space to each column per row
2. Add each row to a larger game board, constructing the player board
*/
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  //create empty board
  let board = [];
  //for each row, create columns and push ' '
  for (i = 0; i < numberOfRows; i++) {
    let row = [];
    for (j = 0; j < numberOfColumns; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}
//console.log(generatePlayerBoard(3, 3));



/* CONST FUNCTION FOR BOMB BOARD
1. Dynamically generate bomb position on board
2. Create game board of specified size
3. Add bombs to random squares on game board
*/
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  //create empty board
  let board = [];
  //for each row, create columns and push ' '
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
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }
  return board;
}


/* FUNCTION TO PRINT THE BOARD TO CONSOLE
1. Print it all to the console
*/
const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
}


// TEST FUNCTIONS
/*
let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
*/
