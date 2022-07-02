import Board from "./Board.js";

export default class Game {
  constructor() {
    this.init();
  }

  init = () => {
    this.turn = "white";
    this.board = new Board("board");
  }
}
