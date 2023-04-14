
import FormValidator from "./FormValidator.js";
import Card from "./Card.js"
import initialCards from "./arrayCards.js"
import {openPopup, popupImageOpen} from "./utils.js";
export {closeOnEscapeForm, closeFormOverlayClick};

const cardPlace = document.querySelector('.element');
const popupProfileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formProfile = document.forms["form-profile"];
const popupProfileOpen = formProfile.closest('.popup');
const popupProfileClose = popupProfileOpen.querySelector('.popup__close-icon');
const inputNameFormProfile = formProfile.querySelector('#username-input');
const jobInput = formProfile.querySelector('#job-input');

const formCard = document.forms['form-card'];
const popupCardOpen = formCard.closest('.popup');
const popupCardClose = popupCardOpen.querySelector('.popup__close-icon');
const popupCardButton = document.querySelector('.profile__add-button');
const inputNameFormAddNewCard = document.querySelector('#name-input');
const inputLinkFormAddNewCard = document.querySelector('#link-input');

const popupImageClose = popupImageOpen.querySelector('.popup__close-icon');

const ValidationSelector = {
  formSet: '.form__set',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}

function validation (ValidationSelector) {
  const  formCardValidation = new FormValidator(ValidationSelector, '.form-card');
  const  formProfileValidation = new FormValidator(ValidationSelector, '.form-profile');
  const formCardValidationAvtive = formCardValidation.enableValidation();
  const formProfileValidationActive = formProfileValidation.enableValidation();

};

validation (ValidationSelector);




function closePopup (item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEscapeForm);
  document.removeEventListener('click', closeFormOverlayClick)
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputNameFormProfile.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfileOpen);
}

function fillProfileFormField () {
  inputNameFormProfile.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}



const newCardButtonValidation = new FormValidator(ValidationSelector, '.form-card');
function popupCardButtonValidate (){
  if (inputNameFormAddNewCard.value === '' && inputLinkFormAddNewCard.value === ''){
    newCardButtonValidation.cardButtonValidation();
  };
};

const objCard = Object.assign({}, initialCards);

function renderCard (objCard) {
  const card = new Card(objCard);
  const cardElement = card.generateCard();
  cardPlace.prepend(cardElement);
};

initialCards.forEach(renderCard);

function getCard (evt) {
  evt.preventDefault();
  const card = {
    name: inputNameFormAddNewCard.value,
    alt: inputNameFormAddNewCard.value,
    link: inputLinkFormAddNewCard.value
  }
  evt.target.reset();
  popupCardButtonValidate();
  renderCard(card);
  closePopup(popupCardOpen);
}


function closeOnEscapeForm (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened') 
    closePopup(openedPopup);
  }
};

function closeFormOverlayClick (evt){
  if (evt.target.classList.contains('popup')){
    closePopup(evt.target);
  }
}

function openingAndContentsOfTheProfileField () {
  fillProfileFormField();
  openPopup(popupProfileOpen);
  const clearInputErrorProfile = new FormValidator(ValidationSelector, '.form-profile');
  clearInputErrorProfile.clearInputError();
}

popupProfileButton.addEventListener('click', openingAndContentsOfTheProfileField);
formProfile.addEventListener('submit', handleProfileFormSubmit);
popupCardButton.addEventListener('click', ()=> openPopup(popupCardOpen));
formCard.addEventListener('submit', getCard);
popupImageClose.addEventListener('click', ()=> closePopup(popupImageOpen));
popupProfileClose.addEventListener('click', ()=> closePopup(popupProfileOpen));
popupCardClose.addEventListener('click', ()=> closePopup(popupCardOpen));