export default class Piece {
  constructor(color) {
    this.color = color;
    this.king = false;
  }

  draw = () => {
    this.element = document.createElement("div");

    if (this.color == "white") {
     this.element.classList.add("white-piece", "piece");
    } else {
     this.element.classList.add("black-piece", "piece");
    }
    return this.element
  }

  possibleMoves(piece) {
    piece.classList.add(`active`);
    const tiles = document.querySelectorAll(".tile");
    const key = parseInt(piece.parentNode.dataset.key);
    const type = piece.classList.contains("king") ? "king" : "pawn";
    const color = piece.classList.contains(`white-piece`) ? "white" : "black";

    let possibleMoves = [];

    if (type === "king") {
      possibleMoves = [
        tiles[key - this.size - 1],
        tiles[key + this.size - 1],
        tiles[key - this.size + 1],
        tiles[key + this.size + 1],
      ];
    } else {
      possibleMoves = [
        tiles[key + (color === "black" ? 9 : -9)],
        tiles[key + (color === "black" ? 11 : -11)],
        // tiles[key + (color === "black" ? this.size - 1 : -this.size - 1)],
        // tiles[key + (color === "black" ? this.size + 1 : -this.size + 1)],
      ];
    }

    possibleMoves
      .filter((tile) => tile.classList.contains("black-tile"))
      .forEach((tile) => {
        if (tile.children.length === 0) {
          tile.classList.add("possible");
          tile.onclick = () => this.movePiece(tile);
        }
      });
  }

  movePiece = (e) => {
    const type = document.querySelector(".king--active") ? "king" : "piece";
    const currentPawn = document.querySelector(`.active`)

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
    const piece = this.draw()

    // e.target.appendChild(piece);
    e.appendChild(piece);


    // console.log(e.target, 777);
    // e.removeEventListener("click", this.movePiece);

    // this.clearAvailableTiles();
    // Move.setTurn();
    // }
    currentPawn.parentNode.innerHTML = "";
    // this.clearAvailableTiles();
    // e.target.addEventListener("click", this.movePiece);
  };
}
