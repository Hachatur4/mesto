
let popupOpen = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close-icon');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let popupContainer = document.querySelector('.popup__container');
let nameInput = popupContainer.querySelector('.popup__input-name');
let jobInput = popupContainer.querySelector('.popup__input-job');
let submitButton = popupContainer.querySelector('.popup__submit-button');

function formOpen ( ) {
  popupOpen.classList.add('popup_opened')
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function handleClosingSubmit ( ) {
  popupOpen.classList.remove('popup_opened');
  nameInput.value = '';
  jobInput.value = '';
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupOpen.classList.remove('popup_opened');
}

submitButton.addEventListener('click', handleFormSubmit);
popupClose.addEventListener('click', handleClosingSubmit);
editButton.addEventListener('click', formOpen);