import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(element, selector) {
    super(selector);
    this._popupImage = this._selector.querySelector('.popup__element-image');
    this._popupTitle = this._selector.querySelector('.popup__title-image');
    this._title = element.querySelector('.card__title');
    this._alt = element.querySelector('.card__image');
    this._image = element.querySelector('.card__image');
  }

  open(){
    super.open();
    this.setEventListeners();
    this._popupImage.src = this._image.src;
    this._popupImage.alt = this._alt;
    this._popupTitle.textContent = this._title.textContent;
  }
};