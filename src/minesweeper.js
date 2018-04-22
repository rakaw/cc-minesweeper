/*

DESCRIPTION: MINESWEEPER

- Dynamically create a game board (player guesses) & a bomb board
(hold bomb locations)

*/

// CONST FUNCTION FOR A BLANK BOARD
//// 1. Add an empty space to each column per row
//// 2. Add each row to a larger game board, constructing player board
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
