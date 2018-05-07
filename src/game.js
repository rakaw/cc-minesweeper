// INSTRUCTIONS
//  To play Minesweeper, we wil create instances of MineSweeperGame
//    in command line.
//  For Example:
//    In the command line, navigate to the lib directory and rune `node`.
//    Run `.load game .js` to load the contents of this file.
//    Then create a Game instance and run commands like so:
//      let game - new game(3, 3, 3);
//      game.playMove(0, 1);
//      game.playMove(1, 2);
//      When done, run `.exit`;


import Board from './board.js';



/* CREATE GAME SUPERCLASS
1. Create a template for a minsweeper game
*/
export class Game {
  constructor (numberOfRows,numberOfColumns,numberOfBombs) {
    this._board = new Board(numberOfRows,numberOfColumns,numberOfBombs);
  }
  // conditions for winning, losing, and continuing play
  playMove (rowIndex,columnIndex) {
    this._board.flipTile(rowIndex,columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('GAME OVER.');
      this._board.print()
    } else if (!this._board.hasSafeTiles()) {
      console.log('YOU WIN!');
    } else {
      console.log('Current Board:');
      this._board.print();
    }
  }
}
