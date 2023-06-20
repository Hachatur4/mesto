import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImageTitle = this._formElement.querySelector('.popup__title-image');
    this._popupImage = this._formElement.querySelector('.popup__element-image');
  }

  open(name, link) {
    this._popupImageTitle.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = `Изображение ${name}`;
    super.open();
  }
};