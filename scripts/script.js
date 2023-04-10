
import {initialCards, objCard, Card} from "./Card.js"
import { validation, objSelector } from "./FormValidator.js";

const popupProfileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formProfile = document.forms["form-profile"];
const popupProfileOpen = formProfile.closest('.popup');
const popupProfileClose = popupProfileOpen.querySelector('.popup__close-icon');
const nameInput = formProfile.querySelector('#username-input');
const jobInput = formProfile.querySelector('#job-input');

const formCard = document.forms['form-card'];
const popupCardOpen = formCard.closest('.popup');
const popupCardClose = popupCardOpen.querySelector('.popup__close-icon');
const popupCardButton = document.querySelector('.profile__add-button');
const cardName = document.querySelector('#name-input');
const cardLink = document.querySelector('#link-input');

const popupImageTitle = document.querySelector('.popup__title-image');
const popupImage = document.querySelector('.popup__element-image');
const popupImageOpen = popupImage.closest('.popup');
const popupImageClose = popupImageOpen.querySelector('.popup__close-icon');


validation (objSelector);

function openPopup (item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEscapeForm);
  document.addEventListener('click', closeFormOverlayClick)
}

function closePopup (item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEscapeForm);
  document.removeEventListener('click', closeFormOverlayClick)
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfileOpen);
}

function fillProfileFormField () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function deleteCard (event){
  const button = event.target
  const cardDelete = button.closest('.card');
  cardDelete.remove()
};

function popupCardButtonValidate (){
  const cardButtonSubmit = document.querySelector('.form-card-button');
  if (cardName.value === '' && cardLink.value === ''){
    cardButtonSubmit.setAttribute('disabled', '');
    cardButtonSubmit.classList.add('form__submit-button_inactive');
  };
}

function renderCard (objCard) {
  const card = new Card(objCard);
  const cardElement = card.generateCard();
  document.querySelector('.element').prepend(cardElement);
}

initialCards.forEach(renderCard);

function getCard (evt) {
  evt.preventDefault();
  const card = {
    name: cardName.value,
    alt: cardName.value,
    link: cardLink.value
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

popupProfileButton.addEventListener('click', () => {
  fillProfileFormField()
  openPopup(popupProfileOpen)
});


formProfile.addEventListener('submit', handleProfileFormSubmit);
popupCardButton.addEventListener('click', ()=> openPopup(popupCardOpen));
formCard.addEventListener('submit', getCard);
popupImageClose.addEventListener('click', ()=> closePopup(popupImageOpen));
popupProfileClose.addEventListener('click', ()=> closePopup(popupProfileOpen));
popupCardClose.addEventListener('click', ()=> closePopup(popupCardOpen));

export {deleteCard, openPopup, popupImageOpen, popupImage, popupImageTitle};
