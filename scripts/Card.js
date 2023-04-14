import {openPopup, popupImageOpen, popupImage, popupImageTitle} from "./utils.js"
import initialCards from "./arrayCards.js"

class Card {
  constructor (item) {
    this._title = item.name;
    this._alt = item.alt;
    this._image = item.link;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('#templateCard')
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__image').alt = this._alt;
    this._element.querySelector('.card__image').src = this._image; /*`url(${this._image})`;*/

    return this._element; 
  }

  _handleOpenPopup() {
    openPopup(popupImageOpen);

    popupImage.src = this._image;
    popupImage.alt = this._alt;
    popupImageTitle.textContent = this._title;
  }

  _cardLike(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }

  _deleteCard (event){
    const button = event.target
    const cardDelete = button.closest('.card');
    cardDelete.remove()
  };
  
  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenPopup()
    });

    this._element.querySelector('.card__like-button').addEventListener('click', (evt) => {
      this._cardLike(evt)
    });

    this._element.querySelector('.card__delete').addEventListener('click', this._deleteCard);
  }
};

export default Card;