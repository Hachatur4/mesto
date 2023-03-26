
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

const imagePopupclick = document.querySelector('.card__image');
const cardPlace = document.querySelector('.element');
const buttonLikeCard = document.querySelector('card__like-button');
const popupImageTitle = document.querySelector('.popup__title-image');
const popupImage = document.querySelector('.popup__element-image');
const popupImageOpen = popupImage.closest('.popup');
const popupImageClose = popupImageOpen.querySelector('.popup__close-icon');


function openForm (item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEscapeForm);
}

function closeForm (item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEscapeForm);
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeForm(popupProfileOpen);
}

function fillProfileFormField () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function clearFormFieldCard () {
  formCard.reset();
}


function createCard (card) {
  const newCard = document.querySelector('#templateCard').content.cloneNode(true);;
  const buttonDelete = newCard.querySelector('.card__delete');
  const cardImage = newCard.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.alt;
  const cardHeading = newCard.querySelector('.card__title');
  cardHeading.textContent = card.name;

  buttonDelete.addEventListener('click', deleteCard);

  newCard.querySelector('.card__like-button').addEventListener('click', function (evt){
    evt.target.classList.toggle('card__like-button_active');
  })

  cardImage.addEventListener('click', function( ){
    openForm(popupImageOpen);
      
    popupImage.src = card.link;
    popupImage.alt = card.alt;
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
    alt: cardName.value,
    link: cardLink.value
  }
  renderCard(card);
  closeForm(popupCardOpen);
}

function closeOnEscapeForm (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened') 
    closeForm(openedPopup);
  }
};

function closeFormOverlayClick (evt){
  if (evt.target.classList.contains('popup')){
    closeForm(evt.target);
  }
}

popupProfileButton.addEventListener('click', fillProfileFormField);
popupCardButton.addEventListener('click', clearFormFieldCard);
popupProfileButton.addEventListener('click', ()=> openForm(popupProfileOpen));
formProfile.addEventListener('submit', handleProfileFormSubmit);
popupCardButton.addEventListener('click', ()=> openForm(popupCardOpen));
formCard.addEventListener('submit', getCard);
popupImageClose.addEventListener('click', ()=> closeForm(popupImageOpen));
popupProfileClose.addEventListener('click', ()=> closeForm(popupProfileOpen));
popupCardClose.addEventListener('click', ()=> closeForm(popupCardOpen));
document.addEventListener('click', closeFormOverlayClick)