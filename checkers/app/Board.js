import Piece from "./Piece.js";
import Tile from "./Tile.js";

export default class Board {
  constructor(id) {
    this.size = 10;
    this.whiteRemaining = this.blackRemaining = ((this.size * this.size) / 2 - this.size) / 2;
    this.turn = "white";
    this.board = document.getElementById(id);
    this.board.classList.add("board");
    this.tiles = document.getElementsByClassName("tile");
    // this.pieces = document.getElementsByClassName("piece");
    this.board.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;
    this.pp = []
    this.generateTiles();
    this.generatePiece("black", (this.size * this.size - 2 * this.size) / 4);
    this.generatePiece("white", (this.size * this.size - 2 * this.size) / 4);
    this.setTurn()
    console.log(this.pp);
    this.pp.forEach(piece => {
      piece.element.onclick = () => {
        piece.possibleMoves(piece.element)
      };
    })
  }


  clearAvailableTiles = () => {
    Array.from(this.tiles).forEach((e) => {
      e.classList.remove("possible");
    });
    // Array.from(this.pieces).forEach((e) => {
    //   e.classList.remove("active");
    // });
  };

  setTurn = () => {
    const whitePieces = document.querySelectorAll(".white-piece, .king-white");
    const blackPieces = document.querySelectorAll(".black-piece, .king-black");

    // this.pieces = document.getElementsByClassName("piece");

    // if (!this.move) {

      blackPieces.forEach((piece) =>
        piece.onclick = () => piece.possibleMoves(piece)
      );
    //   whitePieces.forEach((piece) =>
    //     piece.addEventListener("click", this.possibleMoves)
    //   );
    // } else {
    //   whitePieces.forEach((piece) =>
    //     piece.removeEventListener("click", this.possibleMoves)
    //   );
    //   blackPieces.forEach((piece) =>
    //     piece.addEventListener("click", this.possibleMoves)
    //   );
    // }
  };

  generatePiece = (color, amount, tile) => {
    for (let i = 0; i < amount; i++) {
      const p = new Piece(color);
      const piece = p.draw();
      this.pp = [...this.pp, p]
      
      if (tile) {
        tile.appendChild(piece.element);
      } else {
        this.getStartingPosition(color)[i].appendChild(piece);
      }
    }
  };

  generateTiles = () => {
    let tileIndex = 0;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const toFill = i % 2 !== j % 2;
        this.board.appendChild(new Tile(tileIndex, toFill).element);
        tileIndex++;
      }
    }
  };

  getStartingPosition = (color) => {
    if (color == "black") {
      return Array.from(this.tiles)
        .slice(0, (this.size * this.size - 2 * this.size) / 2)
        .filter((tile) => tile.classList.contains(`black-tile`));
    } else {
      return Array.from(this.tiles)
        .slice((this.size * this.size) / 2 + this.size)
        .filter((tile) => tile.classList.contains(`black-tile`));
    }
  };

  removePiece = (piece) => {
    this.pieces[piece.row][piece.col].element.remove();
    if (piece.color == "white") {
      this.whiteRemaining--;
    } else {
      this.blackRemaining--;
    }
  };

  movePiece = (e) => {
    console.log(e, 777);
    const type = document.querySelector(".king--active") ? "king" : "piece";
    const currentPawn = document.querySelector(`.active`)
    ;
    const color = currentPawn.classList.contains(`black-piece`)
      ? "black"
      : "white";

    // if (this.capture) {
    //   // this.capturePiece(e.target);
    //   console.log("THIS>CAPTURE");
    //   this.generatePiece(color, 1, e.target, type);
    //   this.clearAvailableTiles();

    // } else {
    // console.log(e.target);
    const piece = new Piece(color, type);
    console.log(piece);
    // e.innerHTML = piece.element
    this.generatePiece(color, 1, e.target);
    // console.log(e.target, 777);
    // e.removeEventListener("click", this.movePiece);

    // this.clearAvailableTiles();
    // Move.setTurn();
    // }
    currentPawn.parentNode.innerHTML = "";
    this.clearAvailableTiles();
    // e.target.addEventListener("click", this.movePiece);
  };
}
