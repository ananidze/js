export default class Square {
  constructor({ row, col, toFill }) {
    this.element = document.createElement("div");
    // ცვლადი რომლის ჭეშმარიტების შემთხვევაში უჯრა უნდა შევავსოთ შავი ფერით
    if (toFill) {
      this.element.classList.add("black-square");
    } else {
      this.element.classList.add("white-square");
    }
    // ელემენტისთვის სვეტის და რიგის ატრიბუტების მინიჭება
    this.element.setAttribute("row", row);
    this.element.setAttribute("col", col);
  }
}
