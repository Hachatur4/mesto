
let popupOpen = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.form-profile__close-icon');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formProfile = document.querySelector('.form-profile');
let nameInput = formProfile.querySelector('#profile-name');
let jobInput = formProfile.querySelector('#profile-job');

const cardCreateOpen = document.querySelector('.profile__add-button');
const popupCardOpen = document.querySelector('.popup-card');
const cardClose = document.querySelector('.form-card__close-icon');
const formCard = document.querySelector('.form-card');
const cardName = document.querySelector('#card-name');
const cardLink = document.querySelector('#card-link');
const imagePopupOpen = document.querySelector('.popup-image');
const buttonClosePopupImage = document.querySelector('.popup-image__close-icon');
const imagePopupclick = document.querySelector('.card__image');

function openForm ( ) {
  popupOpen.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleClosingSubmit ( ) {
  popupOpen.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  handleClosingSubmit ();
}

function openCreateCard ( ) {
  popupCardOpen.classList.add('popup-card_opened');
  cardName.value = '';
  cardLink.value = '';
}

function closeCreateCard ( ) {
  popupCardOpen.classList.remove('popup-card_opened');
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

const cardPlace = document.querySelector('.element');

const createCard = (card) => {
  const newCard = document.querySelector('#templateCard').content.cloneNode(true);
  const cardHeading = newCard.querySelector('.card__title');
  cardHeading.textContent = card.name;
  const cardImage = newCard.querySelector('.card__image').src = card.link;
  const buttonDelete = newCard.querySelector('.card__delete');

  buttonDelete.addEventListener('click', deleteCard);

  const buttonLikeCard = document.querySelector('card__like-button');

  newCard.querySelector('.card__like-button').addEventListener('click', function (evt){
    evt.target.classList.toggle('card__like-button_active');
  });

  newCard.querySelector('.card__image').addEventListener('click', function(evt){
    evt.target = imagePopupOpen.classList.add('popup-image_active');
    const popupImage = document.querySelector('.popup-image__element').src = card.link;
    const popupImageTitle = document.querySelector('.popup-image__title');
    popupImageTitle.textContent = card.name;
  })

  buttonClosePopupImage.addEventListener('click', closePopupImage);

  cardPlace.prepend(newCard);
}

initialCards.forEach(createCard);

function closePopupImage () {
  const imagePopupClose = imagePopupOpen.classList.remove('popup-image_active');
}

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
  createCard(card);
  closeCreateCard ();
}

buttonEdit.addEventListener('click', openForm);
formProfile.addEventListener('submit', handleFormSubmit);
popupClose.addEventListener('click', handleClosingSubmit);
cardCreateOpen.addEventListener('click', openCreateCard);
cardClose.addEventListener('click', closeCreateCard);
formCard.addEventListener('submit', getCard);