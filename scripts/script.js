
const popupOpen = document.querySelector('.popup_open-profile');
const buttonEdit = document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('.form-profile__close-icon');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formProfile = document.querySelector('.form-profile');
const nameInput = formProfile.querySelector('#profile-name');
const jobInput = formProfile.querySelector('#profile-job');

const cardCreateOpen = document.querySelector('.profile__add-button');
const popupCardOpen = document.querySelector('.popup_card');
const cardClose = document.querySelector('.form-card__close-icon');
const formCard = document.querySelector('.form-card');
const cardName = document.querySelector('#card-name');
const cardLink = document.querySelector('#card-link');
const imagePopupOpen = document.querySelector('.popup_image');
const buttonClosePopupImage = document.querySelector('.popup-image__close-icon');
const imagePopupclick = document.querySelector('.card__image');
const cardPlace = document.querySelector('.element');
const buttonLikeCard = document.querySelector('card__like-button');
const popupImageTitle = document.querySelector('.popup-image__title');
const popupImage = document.querySelector('.popup-image__element');

function openFormProfile ( ) {
  popupOpen.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closeFormProfile ( ) {
  popupOpen.classList.remove('popup_opened');
}


function openFormCard ( ) {
  popupCardOpen.classList.add('popup-card_opened');
  cardName.value = '';
  cardLink.value = '';
}

function closeFormCard ( ) {
  popupCardOpen.classList.remove('popup-card_opened');
}


function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeFormProfile ();
}


function closePopupImage () {
  imagePopupOpen.classList.remove('popup-image_active');
}


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createCard (card) {
  const newCard = document.querySelector('#templateCard').content.cloneNode(true);;
  const buttonDelete = newCard.querySelector('.card__delete');
  const cardImage = newCard.querySelector('.card__image').src = card.link;
  const cardHeading = newCard.querySelector('.card__title');
  cardHeading.textContent = card.name;

  buttonDelete.addEventListener('click', deleteCard);

  newCard.querySelector('.card__like-button').addEventListener('click', function (evt){
    evt.target.classList.toggle('card__like-button_active');
  })

  newCard.querySelector('.card__image').addEventListener('click', function( ){
    imagePopupOpen.classList.add('popup-image_active');
      
    popupImage.src = card.link;
      
    popupImageTitle.textContent = card.name;
  })
  return newCard;
}


function renderCard (card) {
  cardPlace.prepend(createCard(card));
}

initialCards.forEach(renderCard);

function deleteCard (event){
  const button = event.target
  const cardDelete = button.closest('.card');
  cardDelete.remove()
}

function getCard (evt) {
  evt.preventDefault();
  const card = {
    name: cardName.value,
    link: cardLink.value
  }
  renderCard(card);
  closeFormCard ();
}


buttonEdit.addEventListener('click', openFormProfile);
formProfile.addEventListener('submit', handleFormSubmit);
popupClose.addEventListener('click', closeFormProfile);
cardCreateOpen.addEventListener('click', openFormCard);
cardClose.addEventListener('click', closeFormCard);
formCard.addEventListener('submit', getCard);
buttonClosePopupImage.addEventListener('click', closePopupImage);