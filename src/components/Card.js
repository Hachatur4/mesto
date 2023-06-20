
class Card {
  constructor ({
    cards,
    userId, 
    handleCardClick, 
    handleDeleteCard,
    handleApi_idOwner,
    putAndDeleteLike,
    templateElement
    }) {
    this._title = cards.name;
    this._alt = this._title;
    this._image = cards.link;
    this._cardId = cards._id;
    this._carLikedArray = cards.likes;
    this._id = cards.owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._templateElement = templateElement;
    this._putAndDeleteLike = putAndDeleteLike;
    this._idOwner = handleApi_idOwner;
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
    this._setEventListeners(this._element);
    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__image').alt = this._alt;
    this._element.querySelector('.card__image').src = this._image;
    this._idOwner(this._element, this._id, this._userId);
    this._likeNumber = this._element.querySelector('.card__numberLikes');
    this._cardLikeNumber()
    this._cardLikeCheck()
    return this._element; 
  }
  _cardLikeNumber(){
    this._likeNumber.textContent = this._carLikedArray.length
  }

  updateCardLikeNumber(allUsersLiked,likeNumber, result){
      likeNumber.textContent = result.likes.length;
      allUsersLiked.length = result.likes.length;
  }

  _cardLikeCheck(){
    const isLiked = this._carLikedArray.some((user)=>{
      return this._userId === user._id;
    })
    if(isLiked){
      this._element.querySelector('.card__like-button').classList.add("card__like-button_active")
    }
  }

  cardDelete(event){
    const button = event.target
    const cardDelete = button.closest('.card'); 
    cardDelete.remove() 
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    });

    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._putAndDeleteLike(this._cardId, this._element, this._userId, this._carLikedArray, this._likeNumber, this.updateCardLikeNumber)
      });

    this._element.querySelector('.card__delete').addEventListener('click', (event)=>{
      this._handleDeleteCard(this, this.cardDelete, event)
    });
  };
};

export default Card;