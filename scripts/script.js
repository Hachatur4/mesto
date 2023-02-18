
let popupOpen = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.form-profile__close-icon');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formProfile = document.querySelector('.form-profile');
let nameInput = formProfile.querySelector('#profile-name');
let jobInput = formProfile.querySelector('#profile-job');

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

buttonEdit.addEventListener('click', openForm);
formProfile.addEventListener('submit', handleFormSubmit);
popupClose.addEventListener('click', handleClosingSubmit);
