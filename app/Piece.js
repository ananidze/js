export class Piece {
  constructor(color) {
    this.color = color;
    this.king = false;
    this.element = document.createElement("div");

    if (color === "white") {
      this.element.classList.add("white-piece");
      this.direction = -1;
    } else if (color === "black") {
      this.element.classList.add("black-piece");
      this.direction = 1;
    }
  }
}
