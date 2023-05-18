
class Card {
  constructor ({item, handleCardClick, templateElement}) {
    this._title = item.cardName;
    this._alt = this._title;
    this._image = item.cardLink;
    this._handleCardClick = handleCardClick;
    this._templateElement = templateElement;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateElement)
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
    this._element.querySelector('.card__image').src = this._image;

    return this._element; 
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
      this._handleCardClick(this._title, this._image);
    });

    this._element.querySelector('.card__like-button').addEventListener('click', (evt) => {
      this._cardLike(evt)
    });

    this._element.querySelector('.card__delete').addEventListener('click', this._deleteCard);
  }
};

export default Card;