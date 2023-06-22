
class Card {
  constructor ({
    cards,
    userId, 
    handleCardClick, 
    handleDeleteCard,
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
    this._handleApi_idOwner(this._element, this._id, this._userId);
    this._likeNumber = this._element.querySelector('.card__numberLikes');
    this._loadCardLikeNumber()
    this._checkCardLike()
    return this._element; 
  }

  _handleApi_idOwner(data, allId, userId){
    if (allId === userId){
      data.querySelector('.card__delete').classList.remove("card__delete_disable");
   }else{
     data.querySelector('.card__delete').classList.add("card__delete_disable");
   }
  }

  deleteCard(card){
    card._element.remove()
  }

  _loadCardLikeNumber(){
    this._likeNumber.textContent = this._carLikedArray.length
  }

  _checkCardLike(){
    if(this.checkIsLiked()){
      this._element.querySelector('.card__like-button').classList.add("card__like-button_active")
    }
  }

  checkIsLiked(){
    const isLiked = this._carLikedArray.some((user)=>{
      return this._userId === user._id;})
    return isLiked
  }

  updateCardLikeNumber(result){
    this._likeNumber.textContent = result.likes.length;
    this._carLikedArray.length = result.likes.length;
    this._carLikedArray = result.likes;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._putAndDeleteLike(this)
    })

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    });

    this._element.querySelector('.card__delete').addEventListener('click', ()=>{
      this._handleDeleteCard(this.deleteCard, this)
    });
  };
};

export default Card;