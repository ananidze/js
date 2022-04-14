// import { Piece } from "./Piece.js";
import { Piece } from "./Piece.js";
import Square from "./Square.js";

export default class Board {
  constructor(id) {
    // ელემენტი რომლის გამოყენებითაც გამოვიტანთ დაფას
    this.board = document.getElementById(id);
    // დაფისთვის კლასის დამატება
    this.board.classList.add("board");
    this.size = 10;
    // მეთოდი რომელიც გამოიტანს დაფას ეკრანზე
    this.displayBoard();
  }

  displayBoard() {
    // დაფისთვის ზომის მინიჭება
    this.board.style.width = "95vmin";
    this.board.style.height = "95vmin";
    this.board.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;

    // 100 ელემენტიანი მასივის შექმნა დაფის უჯრებისთვის
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const toFill = i % 2 !== j % 2;
        // უჯრის შექმნა და დაფაზე დამატება
        const cell = new Square(i, j, toFill);
        this.board.appendChild(cell.element);
        // ფიგურების გამოტანა დაფაზე
        if (i % 2 !== j % 2) {
          if (i < this.size / 2 - 1) {
            cell.element.innerHTML = new Piece("white").element.outerHTML;
          } else if (i > this.size / 2) {
            cell.element.innerHTML = new Piece("black").element.outerHTML;
          }
        }
      }
    }
  }
}
