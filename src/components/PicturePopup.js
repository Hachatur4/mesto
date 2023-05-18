import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(name, link) {
    this._selector.querySelector('.popup__title-image').textContent = name;
    const image =  this._selector.querySelector('.popup__element-image');
    image.src = link;
    image.alt = `Изображение ${name}`;
    super.open();
  }
};