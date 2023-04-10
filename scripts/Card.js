import {deleteCard, openPopup, popupImageOpen, popupImage, popupImageTitle} from "./script.js"


export const initialCards = [ 

  { 
    name: 'Архыз', 
    alt: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg' 
  }, 

  { 
    name: 'Челябинская область', 
    alt: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg' 
  }, 

  { 
    name: 'Иваново', 
    alt: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg' 
  }, 

  { 
    name: 'Камчатка', 
    alt: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg' 
  }, 

  { 
    name: 'Холмогорский район', 
    alt: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg' 
  }, 

  { 
    name: 'Байкал', 
    alt: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg' 
  } 
]; 

export const objCard = Object.assign({}, initialCards);

 export class Card {
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

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenPopup()
    });

    this._element.querySelector('.card__like-button').addEventListener('click', (evt) => {
      this._cardLike(evt)
    });

    this._element.querySelector('.card__delete').addEventListener('click', deleteCard);
  }
};