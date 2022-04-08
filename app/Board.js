import { Piece } from "./Piece.js";
import Square from "./Square.js";

export default class Board {
  constructor(id) {
    // ელემენტი რომლის გამოყენებითაც გამოვიტანთ დაფას
    this.board = document.getElementById(id);
    // დაფისთვის კლასის დამატება
    this.board.classList.add("board");
    // მეთოდი რომელიც გამოიტანს დაფას ეკრანზე
    this.displayBoard();
  }

  displayBoard() {
    // დაფისთვის ზომის მინიჭება
    this.board.style.width = "95vmin";
    this.board.style.height = "95vmin";

    // 100 ელემენტიანი მასივის შექმნა დაფის უჯრებისთვის
    Array.from({ length: 100 }, (_, i) => {
      // ელემენტის სვეტის და რიგის გამოთვლა კოორდინანტებისთვის
      const col = Math.floor(i / 10);
      const row = i % 10;
      // ამ ცვლადს ჭეშმარიტების შემთხვევაში უჯრა უნდა შევავსოთ შავი ფერით
      // თუ უჯრის ორივე კოორდინანტი არის ლუწი ან კენტი მაშინ უნდა შევავსოთ შავი ფერით
      const toFill = row % 2 === col % 2;
      // უჯრის შექმნა და დაფაზე დამატება
      const cell = new Square({ row, col, toFill });
      this.board.appendChild(cell.element);
      // ფიგურების გამოტანა დაფაზე
      if (row % 2 === col % 2) {
        if (col < 4) {
          cell.element.innerHTML = `<div class="white-piece"></div>`;
        } else if (col > 5) {
          cell.element.innerHTML = `<div class="black-piece"></div>`;
        }
      }
    });
  }
}
