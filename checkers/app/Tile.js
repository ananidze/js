export default class Tile {
  constructor(index, toFill) {
    this.element = document.createElement("div");
    this.element.classList.add("tile");
    if (toFill) {
      this.element.classList.add("black-tile");
    } else {
      this.element.classList.add("white-tile");
    }
    this.element.dataset.key = `${index}`;
  }
}
