
export default class Section {
  constructor({renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  renderItems(cards, userData) {
    cards.forEach(item => {
      this._renderer(item, userData);
    });
  }

  newAddItems(element){
    this._container.prepend(element);
  }
}